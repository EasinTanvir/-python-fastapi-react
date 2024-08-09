import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const onFetchHandler = async (event) => {
    const token = localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

    try {
      const { data } = await api.get("/user");

      setUser(data.id);
      console.log(data);
    } catch (err) {
      console.log(err);
      console.log(err.response.data.detail);
    }
  };

  useEffect(() => {
    onFetchHandler();
  }, []);

  return <div>UserPage : {user}</div>;
};

export default UserPage;
