import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const onFetchHandler = async (event) => {
    try {
      const { data } = await api.get("/user");

      setUser(data.id);
      console.log(data);
    } catch (err) {
      console.log(err);
      navigate("/login");
      console.log(err.response.data.detail);
    }
  };

  useEffect(() => {
    onFetchHandler();
  }, []);

  return <div>UserPage : {user}</div>;
};

export default UserPage;
