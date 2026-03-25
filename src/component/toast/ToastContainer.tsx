import React from "react";
import type { ToastProps } from "./Toast";
import Toast from "./Toast";

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

interface ToastContainerProps {
  toasts: Omit<ToastProps, "onClose">[];
  onClose: (id: string) => void;
  position?: ToastPosition;
}

const positionStyles = {
  "top-right": "top-5 right-5",
  "top-left": "top-5 left-5",
  "bottom-right": "bottom-5 right-5",
  "bottom-left": "bottom-5 left-5",
};

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onClose,
  position = "top-right",
}) => {
  return (
    <div className={`fixed ${positionStyles[position]} space-y-2 z-50`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
};

export default ToastContainer;