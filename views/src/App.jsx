import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserPage from "./pages/UserPage";

const App = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>{" "}
        <li>
          <Link to="/login">Login</Link>
        </li>{" "}
        <li>
          <Link to="/signup">SignUp</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default App;
