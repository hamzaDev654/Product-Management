import React, { useContext } from "react";
import Modal from "../UI/Modal/Modal";
import classes from "./Home.module.css";
import AuthContext from "../../store/auth-context";
const Message = ({ mesg }) => {
  const ctx = useContext(AuthContext);
  return (
    <Modal onClose={ctx.onCloseModal}>
      <div className={classes.Mesage}>
        <p>{mesg}</p>
      </div>
    </Modal>
  );
};

export default Message;
