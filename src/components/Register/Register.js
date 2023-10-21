import React, { useState, useEffect, useContext } from "react";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import classes from "../Login/Form.module.css";
import { Link, useNavigate } from "react-router-dom";
import useTogglePassword from "../../Hooks/use-togglePassword";
import Message from "../Home/Message";

const Register = () => {
  const initialValue = {
    username: "",
    email: "",
    password: "",
    Cpassword: "",
    userCheck: "",
  };
  const [formValue, setFormValue] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const {
    type,
    icon,
    PiEyeLight,
    PiEyeSlashLight,
    ToggleHandler: handleToggle,
  } = useTogglePassword();

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  let userData = authCtx.userData;

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if (formValue) {
        const inputObject = formValue;
        const { Cpassword, userCheck, ...filteredObject } = inputObject;
        authCtx.onRegister(filteredObject);
      }
      setFormValue(initialValue);
      navigate("/login");
    }
  }, [formErrors]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValue));
    setIsSubmit(true);
  };
  const validate = (values) => {
    let errors = {};
    let regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (!values.username) {
      errors.username = "Username is required !";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is not vaild";
    }

    if (!values.password) {
      errors.password = "Password is required !";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 character !";
    } else if (values.password.length > 10) {
      errors.password = "Password should not be more than 10 character !";
    } else if (values.Cpassword) {
      if (values.Cpassword !== values.password) {
        errors.Cpassword = "Password does not match !";
      }
    }

    if (!values.Cpassword) {
      errors.Cpassword = "Confirmation is required !";
    }
    if (
      values.password &&
      values.Cpassword &&
      values.password.length !== 11 &&
      values.password.length != 3 &&
      values.Cpassword === values.password
    ) {
      if (userData?.some((d) => d.email === values.email)) {
        errors.userCheck = "Already Registered !";
        authCtx.onModalShowHandler(1, "modal");
      }
    }

    return errors;
  };

  return (
    <Card className={classes.form}>
      <h2>Register</h2>

      {authCtx.isModalOpen.isOpen && <Message mesg={formErrors?.userCheck} />}
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
          name="email"
          label="E-Mail"
          type="text"
          errorTitlte={formErrors?.email}
          autoComplete="off"
          value={formValue.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          label="Password"
          type={type}
          errorTitlte={formErrors?.password}
          autoComplete="off"
          value={formValue.password}
          onChange={handleChange}
        />
        <Input
          name="Cpassword"
          label="Confirm-Password"
          type="password"
          errorTitlte={formErrors?.Cpassword}
          autoComplete="off"
          value={formValue.Cpassword}
          onChange={handleChange}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Register
          </Button>
        </div>
        <Link to="/login">
          <p className={classes.redirect}>Login</p>
        </Link>

        {icon && (
          <PiEyeLight
            size={"20px"}
            className={classes.eysIcon}
            onClick={handleToggle}
          />
        )}

        {!icon && (
          <PiEyeSlashLight
            size={"20px"}
            className={classes.eysIcon}
            onClick={handleToggle}
          />
        )}
      </form>
    </Card>
  );
};

export default Register;
