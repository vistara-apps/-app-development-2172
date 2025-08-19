import { cn } from "../../utils/cn";

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "bg-surface rounded-lg p-6 shadow-card border border-text-secondary/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}