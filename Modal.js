import React, { Fragment,useContext } from "react";
import classes from "./Modal.module.css";
import AuthContext from "../Context/AuthContext";
import ReactDOM from "react-dom";

const Backdrop = props =>{
    const ctx = useContext(AuthContext)
    return <div  className={classes.backdrop} onClick={ctx.onClose}/>
};
const Overlay = props =>{
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
};


const Modal = props =>{
    const portalElements = document.getElementById('overlays');
    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop />,portalElements)};

            {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>,portalElements)}
        </Fragment>
    )
};

export default Modal;