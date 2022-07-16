import React from "react";
import AppLogo from "../Images/svg/appLogo.svg";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <>
      <Link to="/" className="logo">
        <img src={AppLogo} height="50px" />
        <div className="logo-title">
          <span className="app-logo-title">
            <b>App</b>Note
          </span>
          <span className="app-logo-subtitle">Greatest ideas born here</span>
        </div>
      </Link>
    </>
  );
}

export default Logo;
