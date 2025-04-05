from fastapi import FastAPI, Request
from agents.listing_agent import analyze_listing

app = FastAPI()

@app.post("/analyze")
async def analyze(request: Request):
    data = await request.json()
    title = data.get("title", "")
    description = data.get("description", "")
    result = analyze_listing(title, description)
    return {"result": result}