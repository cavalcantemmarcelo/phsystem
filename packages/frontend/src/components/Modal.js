import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
      <div className="fixed inset-0">
        <div
          className="absolute inset-0 bg-black opacity-75"
          onClick={onClose}
        ></div>
        <div className="relative bg-white w-full max-w-md p-6 m-4 mx-auto rounded-md shadow-md">
          <h2 className="text-2xl mb-4">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
