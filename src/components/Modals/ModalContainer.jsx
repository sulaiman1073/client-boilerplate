import React from "react";
import Modal from "react-modal";
import classnames from "classnames";
import "./ModalContainer.css";

Modal.setAppElement("#root");

export default function ModalContainer({
  isOpen,
  width = "lg",
  fixedFullHeight,
  handleModalClose,
  background = "white",
  header,
  children
}) {
  const modalClasses = classnames("rounded-xl shadow-xl outline-none", {
    "bg-primaryBackground": background === "white",
    "bg-secondaryBackground": background === "gray",
    "w-full sm:w-100": width === "sm",
    "w-full sm:w-modal": width === "md",
    "w-full md:w-3/4 lg:w-1/2": width === "lg"
  });

  // h-75vh to support all screen heights
  const contentClasses = classnames(
    "h-75vh flex flex-col items-stretch overflow-hidden",
    {
      "h-modalFull": fixedFullHeight,
      "rounded-xl": !header,
      "rounded-b-xl": header
    }
  );

  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={170}
      contentLabel="modal"
      onRequestClose={handleModalClose}
      className={modalClasses}
      overlayClassName="ModalManager--modalOverlay"
    >
      {header ? header : <></>}
      <div className={contentClasses}>{children}</div>
    </Modal>
  );
}
