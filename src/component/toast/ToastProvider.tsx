

import React, { createContext, useCallback, useState } from "react";
import type { ToastPosition } from "./ToastContainer";
import type { ToastProps, ToastVariant } from "./Toast";
import ToastContainer from "./ToastContainer";

type ToastItem = Omit<ToastProps, "onClose">;

interface AddToastOptions {
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastContextValue {
  toast: (options: AddToastOptions) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

let _id = 0;
const generateId = () => `toast-${++_id}-${Date.now()}`;

const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "top-right",
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const addToast = useCallback(
    ({ message, variant = "info", duration = 3000 }: AddToastOptions) => {
      const id = generateId();

      setToasts((prev) => {
        const next = [...prev, { id, message, variant, duration }];
        return next.length > maxToasts
          ? next.slice(next.length - maxToasts)
          : next;
      });
    },
    [maxToasts]
  );

  const value: ToastContextValue = {
    toast: addToast,
    success: (message, duration) =>
      addToast({ message, variant: "success", duration }),
    error: (message, duration) =>
      addToast({ message, variant: "error", duration }),
    warning: (message, duration) =>
      addToast({ message, variant: "warning", duration }),
    info: (message, duration) =>
      addToast({ message, variant: "info", duration }),
    dismiss,
    dismissAll,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={dismiss} position={position} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;