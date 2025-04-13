
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface QuickReplyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const QuickReplyButton = ({ 
  children, 
  className, 
  ...props 
}: QuickReplyButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-full",
        "bg-accent hover:bg-accent/80 text-primary transition-colors",
        "border border-accent/50 hover:border-accent",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default QuickReplyButton;
