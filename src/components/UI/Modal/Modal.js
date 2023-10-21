import React, { Fragment, useContext } from "react";
import classes from "./Modal.module.css";
import { createPortal } from "react-dom";
import { RxCrossCircled } from "react-icons/rx";
import AuthContext from "../../../store/auth-context";
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  const { onCloseModal } = useContext(AuthContext);
  return (
    <div className={classes.modal}>
      <RxCrossCircled
        size={"40px"}
        className={classes.crossIcon}
        onClick={onCloseModal}
      />
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const portalEelement = document.getElementById("overlays");

  return (
    <Fragment>
      {createPortal(<Backdrop onClose={props.onClose} />, portalEelement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalEelement
      )}
    </Fragment>
  );
};

export default Modal;
