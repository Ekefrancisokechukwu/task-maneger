import { cn } from "@/lib/utils";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal = ({ children, isOpen, onClose, className }: ModalProps) => {
  React.useEffect(() => {
    if (isOpen) {
      // When the modals is open hide the body overflow
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  return (
    <div
      className={cn(
        isOpen ? "opacity-100 visible" : "opacity-0 invisible",
        className
      )}
    >
      <div
        onClick={onClose}
        className={cn(
          "fixed bg-black/75 transition-all duration-300 ease-out top-0 left-0 z-30 w-full h-full",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      ></div>
      {children}
    </div>
  );
};
export default Modal;
