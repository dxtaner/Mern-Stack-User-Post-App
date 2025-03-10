import React from "react";
import ReactDOM from "react-dom";
import Button from "../Button/Button";
import "./Modal.css";

const Modal = (props) => {
  const {
    title,
    onCancelModal,
    onAcceptModal,
    acceptEnabled,
    isLoading,
    children,
  } = props;

  const modalContent = (
    <div className="modal">
      <header className="modal_header">
        <h1>{title}</h1>
      </header>
      <div className="modal_content">{children}</div>
      <div className="modal_actions">
        <Button design="danger" mode="flat" onClick={onCancelModal}>
          Cancel
        </Button>
        <Button
          mode="raised"
          onClick={onAcceptModal}
          disabled={!acceptEnabled}
          loading={isLoading}>
          Accept
        </Button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
};

export default Modal;
