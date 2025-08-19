import { cn } from "../../utils/cn";

const buttonVariants = {
  primary: "bg-primary hover:bg-primary/90 text-white",
  secondary: "bg-surface hover:bg-surface/80 text-text-primary border border-text-secondary/20",
  destructive: "bg-red-600 hover:bg-red-700 text-white",
};

export function Button({ 
  children, 
  variant = "primary", 
  className, 
  ...props 
}) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        buttonVariants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}