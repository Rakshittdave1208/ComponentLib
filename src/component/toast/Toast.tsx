import React, { useEffect } from "react";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose: (id: string) => void;
}

const variantStyles = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
};

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  variant = "info",
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div
      className={`px-4 py-2 text-white rounded-lg shadow-lg animate-slideIn ${
        variantStyles[variant]
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;