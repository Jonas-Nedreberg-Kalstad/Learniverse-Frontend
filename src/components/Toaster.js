import React, { useState, useEffect} from "react";
import ReactDOM from 'react-dom';

let triggerToastExternally; // Function to trigger toast externally
let isBusy = false; // Flag to prevent multiple toasts at once
let waitTimer; // Timer to hide toast after a delay

function Toaster() {

  const [toastMsg, setMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    triggerToastExternally = (type, msg) => {

      if (isBusy) return; // Prevent multiple toasts at once

      isBusy = true; // Set busy flag

      setMessage(msg);
      setToastType(type);
      setVisible(true);
      console.log("Toast triggered externally:", msg);

      // Hide after timeout (but keep mounted)
      waitTimer = setTimeout(() => {
        setVisible(false);
        isBusy = false; // Reset busy flag after hiding
        console.log("3 seconds passed, hiding toast.");
      }, 3000); // Show for 3 seconds
    };
  }, []);

  const closeMessage = () => {
    clearTimeout(waitTimer); // Clear the timer to prevent hiding if clicked
    setVisible(false);
    isBusy = false; // Reset busy flag when closed manually
  };

  return ReactDOM.createPortal(
    <div className={`Toaster-Container ${visible ? "show" : "hide"}`}>
      <div className={`Toaster-Message-Container ${toastType}`} onClick={() => {closeMessage()}}>
        <span className="Toaster-Message">{toastMsg}</span>
      </div>
    </div>,
    document.getElementById('info-root')
  );
}

export function notify(type, msg) {
  if (triggerToastExternally) {
    triggerToastExternally(type, msg);
  } else {
    console.error("Toaster is not mounted yet.");
  }
}

export default Toaster;