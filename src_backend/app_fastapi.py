from fastapi import FastAPI
from main import run_query
from fastapi.middleware.cors import CORSMiddleware
#import os

app = FastAPI()

# set up allowable origins for managing CORS policy
origins = [
    #"http://localhost:3000", # for development purposes only
    "http://blueskyengineering.net/",
]
# Or, to allow all origins (use with caution):
# origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Your list of allowed origins
    allow_credentials=True, # Allow cookies, authorization headers, etc.
    #allow_methods=["*"],   # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_methods=["GET"],  # Allow only HTTP (GET)
    allow_headers=["*"],    # Allow all headers
)


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