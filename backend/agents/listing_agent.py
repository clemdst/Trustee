import os
from mistralai import Mistral, UserMessage

# Use the API key from environment variables
api_key = 'aZIxFzj12oiTJrlWgZbh0hLyJNC9Arz4'
model = "mistral-small"  # or "mistral-small" based on your preference

client = Mistral(api_key=api_key)

def analyze_listing(title: str, description: str, price: float) -> str:
    prompt = f"""
You are a fraud detection assistant. Analyze the following e-commerce listing, and return your response in  return:
Return your answer in the following JSON format:

{{
  "score": <int from 0 to 100>,
  "red_flags": ["..."],
  "verdict": "Likely Scam" | "Possibly Scam" | "Likely Safe"
}}

Title: {title}
Description: {description}
Price: ${price}
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
