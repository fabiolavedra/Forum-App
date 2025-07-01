import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import SocialButton from "../components/SocialButton";

const AuthView = () => {
  const [isLogin, setIsLogin] = useState(true);

  console.log("isLogin", isLogin);

  return (
    <div className="login-container">
      <div className="welcome-section">
        <div className="background-pattern">
          <div className="bg-blur-1"></div>
          <div className="bg-blur-2"></div>
          <div className="bg-blur-3"></div>
        </div>

        <div className="welcome-content">
          <div className="logo-container">
            <div className="logo-circle">
              <div className="logo-shape"> Fumbl.</div>
            </div>
          </div>

          <h1 className="welcome-title">Get Started</h1>

          <div className="social-buttons">
            <SocialButton
              provider="Google+"
              onClick={() => console.log("Google+ login")}
            />
            <SocialButton
              provider="Facebook"
              onClick={() => console.log("Facebook login")}
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        {isLogin ? (
          <Login onToggleToRegister={() => setIsLogin(false)} />
        ) : (
          <Register onToggleToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthView;
