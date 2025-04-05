from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

# Load your fine-tuned model (adjust the name)
model_name = "your-org/fraud-detection-neuralchat"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

fraud_detector = pipeline("text-generation", model=model, tokenizer=tokenizer)

def analyze_listing(title: str, description: str) -> str:
    prompt = f"""
You are a fraud detection assistant. Analyze the following listing and return:
- Scam risk score (0–100)
- List of red flags
- Final verdict (Likely Scam / Possibly Scam / Likely Safe)

Title: {title}
Description: {description}
"""
    response = fraud_detector(prompt, max_new_tokens=200)[0]['generated_text']
    return response