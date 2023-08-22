// Header.js
import React from "react";
import "../Header/Header.css";
import {
  ArrowBack as ArrowBackIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const Header = () => {
  return (
    <div className="header">
      CodeBase Scout
      <button className="back-button">
        <ArrowBackIcon />
      </button>
      <div className="setting-button">
        <SettingsIcon />
      </div>
    </div>
  );
};

export default Header;
