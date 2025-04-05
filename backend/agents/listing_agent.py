import os
import json
from mistralai import Mistral, UserMessage
from backend.rag.rag_engine import get_rag_context

api_key = 'PSUKsxRiQe8xRdsSrrwkkD9zgCqrey3b'
model = "mistral-small"

client = Mistral(api_key=api_key)

def analyze_listing(title: str, description: str, price: float) -> str:
    listing_summary = f"Title: {title}\nDescription: {description}\nPrice: ${price}"

    # 🧠 Retrieve relevant context dynamically via RAG
    rag_context = get_rag_context(listing_summary)

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

    
    # Create a UserMessage object with the prompt
    messages = [UserMessage(content=prompt)]

    # Stream the response from the model
    stream_response = client.chat.stream(
        model=model,
        messages=messages 
    )

    # Print the response chunks as they arrive
    response_content = ""
    for chunk in stream_response:
        response_content += chunk.data.choices[0].delta.content

    return response_content
