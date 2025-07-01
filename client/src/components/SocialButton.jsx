import React from "react";
import "./SocialButton.css";

const SocialButton = ({ provider, onClick }) => {
  return (
    <button onClick={onClick} className="social-button">
      Sign in with {provider}
    </button>
  );
};

export default SocialButton;
