import React, { Fragment } from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <Fragment>
      <div className={classes.control}>
        <label htmlFor={props.id}>{props.label}</label>
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          autoComplete={props.autoComplete}
          onChange={props.onChange}
        />
      </div>
      <span className={classes.errorTitlte} >{props.errorTitlte}</span>
    </Fragment>
  );
};

export default Input;
