import React, { useEffect, useRef } from "react";

/**
 * React Wrapper for Mayvio UI Modal component.
 * Customizes confirmation or information overlays with accessible behaviors.
 * 
 * Props:
 * - isOpen (boolean): Controls display state.
 * - onClose (function): Callback triggered on backdrop clicks, escape, or close click.
 * - title (string): Header title text.
 * - children (ReactNode): Content of the modal body.
 */
export function ModalWrapper({ isOpen, onClose, title, children }) {
  const overlayRef = useRef(null);

  // Sync open state with DOM attributes and body overflow
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isOpen) {
      overlay.classList.add("show");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      overlay.querySelector(".modal-close")?.focus();
    } else {
      overlay.classList.remove("show");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Handle escape key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // ensure overflow cleanup
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className={`modal-overlay ${isOpen ? "show" : ""}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mayvio-modal-title"
      onClick={handleBackdropClick}
    >
      <div className="modal">
        <div className="modal-header">
          <h3 id="mayvio-modal-title">{title}</h3>
          <button className="modal-close" aria-label="Close modal" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
