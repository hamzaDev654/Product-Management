import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Navigation.module.css";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  const ctx = useContext(AuthContext);
  const userDataStorage = JSON.parse(localStorage.getItem("loggedInUser"));
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          {ctx.isLoggedIn && (
            <strong>{userDataStorage ? userDataStorage.username : ""}</strong>
          )}
        </li>
        <li>
          <NavLink to="/products">{ctx.isLoggedIn && <p>Product</p>}</NavLink>
        </li>

        <li>
          {ctx.isLoggedIn && <button onClick={ctx.onLogout}>Logout</button>}
        </li>

        <li>
          {!ctx.isLoggedIn && (
            <Link to="/login">
              <button>Login/ Sign</button>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
