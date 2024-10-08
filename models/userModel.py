from sqlalchemy import Column, Integer, String, Boolean , ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50))
    email = Column(String(100))
    password = Column(String(255))
    isAdmin = Column(Boolean, default=False)
    posts = relationship("Post", back_populates="creator")



