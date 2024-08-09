from sqlalchemy import Column, Integer, String, Boolean , ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(50))
    desc = Column(String(100))
    creator_id = Column(Integer, ForeignKey("users.id"))
    creator = relationship("User", back_populates="posts")
 

