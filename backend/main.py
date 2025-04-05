from fastapi import FastAPI, Request
import json
from backend.agents.listing_agent import analyze_listing

app = FastAPI()

# Path to the JSON file containing the fake listing
FAKE_LISTING_PATH = "/Workshop/test_data/fake_listing_1.json"

# Global variable to store the analyze result
analyze_result = None

@app.post("/analyze")
async def analyze(request: Request):
    data = await request.json()
    title = data.get("title", "")
    description = data.get("description", "")
    price = float(data.get("price", 0))
    result = analyze_listing(title, description, price)
    return {"result": result}

# Add the startup event to run the analyze function with the fake data
@app.on_event("startup")
async def run_analyze_on_startup():
    global analyze_result  # Use the global variable to store the result
    
    # Read the fake_listing_1 data from the JSON file
    with open(FAKE_LISTING_PATH, 'r') as f:
        data = json.load(f)
    
    # Simulate the request object as it would be in the POST request
    class MockRequest:
        def __init__(self, data):
            self._data = data

        async def json(self):
            return self._data

    request = MockRequest(data)
    
    # Call the analyze function with the mock request
    result = await analyze(request)
    
    # Assign the result to the global variable
    analyze_result = result['result']
    
    # Print the result to the console (optional)
    print(analyze_result)

@app.get("/")
async def read_root():
    return {
        "message": "Welcome to the Trust Advisor API!",
        "result": analyze_result  # Return the result of analyze during startup
    }
