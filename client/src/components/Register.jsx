import React, { useState } from "react";
import axios from "axios";

const Register = ({ onToggleToLogin }) => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(import.meta.env.VITE_API_URL + "/api/users/register", newUser)
      .then((res) => {
        console.log("New user added!", res);
        onToggleToLogin(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("asdasdasda");

  return (
    <div className="form-container">
      <div className="tab-buttons">
        <button className="tab-button inactive" onClick={onToggleToLogin}>
          Log In
        </button>
        <button className="tab-button active-register">Register</button>
      </div>

      <h2 className="form-title">Create Account</h2>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={newUser.firstName}
            onChange={(e) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
            placeholder="Enter your first name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={newUser.lastName}
            onChange={(e) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
            placeholder="Enter your last name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
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
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            placeholder="Enter your password"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confrim Password
          </label>
          <input
            id="confirmPassword"
            type="confirmPassword"
            value={newUser.confirmPassword}
            onChange={(e) =>
              setNewUser({ ...newUser, confirmPassword: e.target.value })
            }
            placeholder="Confirm your confirm"
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
