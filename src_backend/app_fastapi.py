from fastapi import FastAPI
from main import run_query
#import os

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello World"}

# test url: http://127.0.0.1:8000/chat?question=what experience do you have in machine learning engineering
# prod url: http://0.0.0.0:8000/chat?question=what experience do you have in machine learning engineering
@app.get('/chat')
async def chat(question:str) -> str:

    # pass the user question to the RAG pipeline
    response = run_query(question + '?')
    response_clean = response.encode('utf-8', errors='ignore').decode('utf-8')
    print(f"\n\n{response_clean}\n\n")

    return response_clean