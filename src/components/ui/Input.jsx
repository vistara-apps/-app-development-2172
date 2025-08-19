import { cn } from "../../utils/cn";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full px-3 py-2 bg-bg border border-text-secondary/20 rounded-md text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
        className
      )}
      {...props}
    />
  );
}