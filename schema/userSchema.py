from pydantic import BaseModel,  constr


class CreateUser(BaseModel) :
    username : str
    email : str
    password: constr(min_length=6) # type: ignore
    
    
class LoginUser(BaseModel) :   
    email : str
    password: str
    
  
    
    
class ShowUser(BaseModel) :
    id:int
    username : str
    email : str
    isAdmin : bool


class Token(BaseModel):
    id:int
    username : str
    email : str
    isAdmin : bool
    access_token: str
    token_type: str
   


class TokenData(BaseModel):
    id: int | None = None