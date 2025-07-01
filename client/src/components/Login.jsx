import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import Fyp from "../views/Fyp";
import { useNavigate } from "react-router-dom";

const Login = ({ onToggleToRegister }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  console.log("asdasda", import.meta.env);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(import.meta.env.VITE_API_URL + "/api/users/login", user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("success!", res);
        navigate("/fyp");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-section">
      <div className="form-container">
        <div className="tab-buttons">
          <button className={`tab-button active-login`}>Log In</button>
          <button
            className={"tab-button inactive"}
            onClick={() => onToggleToRegister()}
          >
            Register
          </button>
        </div>

        <h2 className="form-title">Log In</h2>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>

        <div className="form-links">
          <button onClick={() => onToggleToRegister()} className="form-link">
            Not a Member yet?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
