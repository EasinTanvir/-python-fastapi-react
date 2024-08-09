from fastapi import APIRouter, status, Depends, HTTPException
from typing import Annotated
from fastapi.security import  OAuth2PasswordRequestForm
from schema.userSchema import CreateUser, ShowUser, LoginUser, Token, TokenData
from database import db_dependency
from models.userModel import User
from utils.HashPassword import Hash
from utils.JwtToken import create_access_token, protect_routes


router = APIRouter(
    prefix='/user',
    tags=['User Routes']
)


@router.get('/',response_model=ShowUser, status_code=status.HTTP_201_CREATED)

def get_user(db : db_dependency,  get_current_user:TokenData = Depends(protect_routes) ) :
    
    user = db.query(User).filter(User.id == get_current_user.id).first()
    
    if user is None :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No User Found")    
    
    return user




@router.post('/login',  status_code=status.HTTP_201_CREATED,)

def login_users(db : db_dependency, request :Annotated[OAuth2PasswordRequestForm, Depends()]) :
    
    user = db.query(User).filter(User.email == request.username).first()
    
    if user is None :
        raise HTTPException(status_code=401, detail='No User Found')   
    
    hash_pass = Hash.verify_password(request.password, user.password)
    
    if hash_pass is False :
        raise HTTPException(status_code=401, detail='Invalid Password') 
   
    access_token = create_access_token(data={"id": user.id})
    return Token(access_token=access_token, token_type="bearer", id=user.id, username=user.username, isAdmin=user.isAdmin, email=user.email)








@router.post('/register', response_model=ShowUser, status_code=status.HTTP_201_CREATED)

def create_user(db : db_dependency, request :CreateUser) :
    
    emailExist = db.query(User).filter(User.email == request.email).first()
    
    if emailExist :
        raise HTTPException(status_code=401, detail='Email already axist')   
    
    hash_pass = Hash.get_password_hash(request.password)
    user = User(username=request.username, email =request.email, password = hash_pass)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
