import { X } from "lucide-react";
import { Button } from "./Button";

export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-text-secondary/20">
          <h2 className="text-heading2">{title}</h2>
          <Button variant="secondary" onClick={onClose} className="p-2">
            <X size={20} />
          </Button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}