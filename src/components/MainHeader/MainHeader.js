import React from "react";
import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";
import logo from "../../slide-img/Logo.png";
import { Link } from "react-router-dom";
const MainHeader = (props) => {
 
  return (
    <header className={classes["main-header"]}>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <Navigation />
    </header>
  );
};

export default MainHeader;
