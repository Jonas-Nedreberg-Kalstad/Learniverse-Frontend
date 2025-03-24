import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// This variable will hold the external trigger
let triggerModalExternally;
let closeModalExternally;

function Modal() {
  const [visible, setVisible] = useState(false);
  const [modalChildren, setModalChildren] = useState(null);

  // Effect to manage scroll locking
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  // Register the external trigger
  useEffect(() => {
    triggerModalExternally = (children) => {
      setModalChildren(children);
      setVisible(true);
    };
    closeModalExternally = () => {
      setModalChildren(null);
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div className="Modal-Overlay" onClick={() => setVisible(false)}>
      <div className="Modal-Container" onClick={(e) => e.stopPropagation()}>
        {modalChildren}
        <button onClick={() => setVisible(false)}>Close</button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;

// External function to open the modal
export function OpenModal(children) {
  if (triggerModalExternally) {
    triggerModalExternally(children);
  } else {
    console.error("Modal is not mounted yet.");
  }
}

export function CloseModal() {
  if (closeModalExternally) {
    closeModalExternally();
  } else {
    console.error("Modal is not mounted yet.");
  }
}