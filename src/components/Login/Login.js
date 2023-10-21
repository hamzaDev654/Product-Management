import React, { useState, useEffect, useContext } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";
import classes from "./Form.module.css";
import { Link, useNavigate } from "react-router-dom";
import useTogglePassword from "../../Hooks/use-togglePassword";

const Login = (props) => {
  const {
    type,
    icon,
    PiEyeLight,
    PiEyeSlashLight,
    ToggleHandler: handleToggle,
  } = useTogglePassword();

  const initialValue = { username: "", password: "" };
  const [formValue, setFormValue] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  let userData = authCtx.userData;

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

 
  useEffect(() => {
    
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      authCtx.onLogin(formValue);
      navigate("/");
    }
  }, [formErrors, isSubmit]);

  const validate = (values) => {
    let errors = {};
    const user = userData.find((d) => d.username === values.username);
    if (!values.username) {
      errors.username = "Username is required!";
    } else if (!user) {
      errors.username = "Username is not valid";
    } else if (user.password !== values.password) {
      errors.password = "Incorrect password";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }

    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValue));
    setIsSubmit(true);
  };

  return (
    <Card className={classes.form}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="User Name"
          type="text"
          errorTitlte={formErrors?.username}
          autoComplete="off"
          value={formValue.username}
          onChange={handleChange}
        />
        <Input
          name="password"
          label="Password"
          type={type}
          errorTitlte={formErrors?.password}
          value={formValue.password}
          onChange={handleChange}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
        <Link to="/registration">
          <p className={classes.redirect}>Don't have accont ?</p>
        </Link>
        {icon && (
          <PiEyeLight
            size={"20px"}
            className={classes.eysIconLogin}
            onClick={handleToggle}
          />
        )}

        {!icon && (
          <PiEyeSlashLight
            size={"20px"}
            className={classes.eysIconLogin}
            onClick={handleToggle}
          />
        )}
      </form>
    </Card>
  );
};

export default Login;
