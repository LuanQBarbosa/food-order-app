import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = ({ onClick }) => {
  return <div className={classes.backdrop} onClick={onClick} />;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
};

const portalElement = document.querySelector('#overlays');

const Modal = ({ onClose, children }) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </React.Fragment>
  );
};

export default Modal;