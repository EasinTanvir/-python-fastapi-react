import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ username: "", password: "" });

  const onChangeHandler = (event) => {
    const { value, name } = event.target;

    setInput({ ...input, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("username", input.username);
    formData.append("password", input.password);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/user/login",
        formData,
        {
          withCredentials: true,
          withXSRFToken: true,
        }
      );
      navigate("/");
      localStorage.setItem("access_token", JSON.stringify(data.access_token));
      console.log(data);
    } catch (err) {
      console.log(err.response.data.detail);
    }

    console.log(input);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="">Email</label>
          <input type="text" name="username" onChange={onChangeHandler} />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" name="password" onChange={onChangeHandler} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
