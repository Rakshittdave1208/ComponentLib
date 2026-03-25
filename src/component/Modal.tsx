import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Modal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const modalContent = isOpen
    ? ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={handleClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="relative w-[400px] rounded-2xl bg-white p-6 shadow-xl animate-fadeIn">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Modal Title
              </h2>
              <p className="text-sm text-gray-600">
                This modal manages all of its open and close logic inside
                {" "}
                <code>Modal.tsx</code>, including the button, backdrop, and
                Escape key handling.
              </p>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="rounded-xl bg-black px-5 py-3 text-white shadow-lg transition hover:bg-gray-800"
      >
        Open Modal
      </button>
      {modalContent}
    </>
  );
};

export default Modal;
