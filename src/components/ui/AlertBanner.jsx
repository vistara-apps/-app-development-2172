import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

export function AlertBanner({ message, type = "warning", onDismiss }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <div className="bg-yellow-600/20 border border-yellow-600/40 rounded-md p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="text-yellow-400 mr-2" size={20} />
          <span className="text-text-primary">{message}</span>
        </div>
        <button onClick={handleDismiss} className="text-text-secondary hover:text-text-primary">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}