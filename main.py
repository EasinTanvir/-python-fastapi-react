from fastapi import FastAPI
from database import  engine, Base
from models import userModel, postModel
from routers import userRouter
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    
]



app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)

app.include_router(userRouter.router)


