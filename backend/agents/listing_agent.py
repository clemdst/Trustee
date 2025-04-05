import os
import json
import requests
from mistralai import Mistral, UserMessage
from backend.rag.rag_engine import get_rag_context
from serpapi import GoogleSearch
from PIL import Image
import imagehash
from io import BytesIO

api_key = 'OZSyUAoFi2DmsjJz5Cuqg8vWeFzG9grq'
model = "mistral-small"
client = Mistral(api_key=api_key)

SERPAPI_API_KEY = "e9f800cc59f225b309a6f97cb6a096c0d5e6f61f0f929aa86fd983c511965b1e"

def compare_images_locally(base_url: str, match_urls: list, threshold: int = 5) -> dict:
    try:
        base_img = Image.open(BytesIO(requests.get(base_url).content)).convert("RGB")
        base_hash = imagehash.phash(base_img)

        similar = []
        for url in match_urls:
            if not any(url.lower().endswith(ext) for ext in [".jpg", ".jpeg", ".png", ".webp"]):
                print(f"⚠️ Skipping non-image URL: {url}")
                continue

            try:
                match_img = Image.open(BytesIO(requests.get(url).content)).convert("RGB")
                match_hash = imagehash.phash(match_img)
                diff = base_hash - match_hash

                print(f"[🔍] Comparing with {url} | Hash diff: {diff}")

                if diff <= threshold:
                    similar.append({
                        "url": url,
                        "similarity_score": 100 - (diff * 5)
                    })
            except Exception as e:
                print(f"⚠️ Failed to compare {url}: {e}")
                continue

        return {
            "similar_count": len(similar),
            "similar_matches": similar
        }
    except Exception as e:
        return {"error": str(e)}

def check_image_with_serpapi(image_url: str) -> dict:
    params = {
        "engine": "google_reverse_image",
        "image_url": image_url,
        "api_key": SERPAPI_API_KEY,
    }

    try:
        search = GoogleSearch(params)
        results = search.get_dict()
        matches = results.get("image_results", [])
        match_urls = [match.get("original") or match.get("thumbnail") for match in matches if match.get("original") or match.get("thumbnail")][:3]
        similarity = compare_images_locally(image_url, match_urls) if match_urls else {}

        return {
            "image_found_elsewhere": len(match_urls) > 0,
            "image_matches": match_urls,
            "similarity": similarity
        }
    except Exception as e:
        return {"error": str(e)}

def analyze_listing(title: str, description: str, price: float, image_url: str = None) -> dict:
    listing_summary = f"Title: {title}\nDescription: {description}\nPrice: ${price}"

    # 🧠 Retrieve relevant context dynamically via RAG
    rag_context = get_rag_context(listing_summary)

    # 🔍 Image analysis using SerpApi and local comparison
    image_analysis = {}
    if image_url:
        image_analysis = check_image_with_serpapi(image_url)

    prompt = f"""
    You are a fraud detection assistant specialized in identifying scam patterns in online marketplace listings.

    Use the following known scam indicators as your guide:
    {rag_context}

    Analyze the following listing:

    {listing_summary}

    Return your assessment in exactly this JSON format:

    {{
      "score": <int from 0 to 100>,
      "red_flags": ["..."],
      "verdict": "Likely Scam" | "Possibly Scam" | "Likely Safe",
      "scammer_objective": "Explain briefly or 'None'"
    }}

    Return JSON only, without commentary.
    """

    messages = [UserMessage(content=prompt)]

    stream_response = client.chat.stream(
        model=model,
        messages=messages
    )

    response_content = ""
    for chunk in stream_response:
        response_content += chunk.data.choices[0].delta.content

    try:
        result = json.loads(response_content)
        result["image_analysis"] = image_analysis
        return result
    except json.JSONDecodeError:
        return {
            "error": "Invalid JSON format from Mistral",
            "raw_output": response_content,
            "image_analysis": image_analysis
        }