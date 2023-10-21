import React from "react";
import classes from "../Login/Form.module.css";
const Result = ({ msg, title, price , record}) => {
  return (
    <div className={classes.msg}>
      <p>{msg}</p>
      <strong>{record} RECORD</strong>
      <table border={1}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{title}</td>
            <td>{price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Result;
