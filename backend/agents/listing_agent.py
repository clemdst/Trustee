import os
import json
import requests
from mistralai import Mistral, UserMessage
from backend.rag.rag_engine import get_rag_context
from backend.agents.image_agent import compare_images
from serpapi import GoogleSearch
from PIL import Image, ImageChops
from io import BytesIO


api_key = 'PSUKsxRiQe8xRdsSrrwkkD9zgCqrey3b'
model = "mistral-small"
client = Mistral(api_key=api_key)

SERPAPI_API_KEY = "e9f800cc59f225b309a6f97cb6a096c0d5e6f61f0f929aa86fd983c511965b1e"

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
        pages = results.get("pages_with_matching_images", [])
        match_urls = [match.get("original") or match.get("thumbnail") for match in matches if match.get("original") or match.get("thumbnail")][:20]
        similarity = compare_images(image_url, match_urls) if match_urls else {}

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