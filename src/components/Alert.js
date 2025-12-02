import React, { useEffect } from "react";
import "./Alert.css";

function Alert({ show, type = "success", message, onClose }) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2500); 
    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`alert alert-${type} alert-dismissible fade show custom-alert`} role="alert">
      {message}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
}

export default Alert;
