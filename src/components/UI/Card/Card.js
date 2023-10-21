import React from "react";

import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`} key={props.key || 0}>
      {props.children}
    </div>
  );
};

export default Card;
