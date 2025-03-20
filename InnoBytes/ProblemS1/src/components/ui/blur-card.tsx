import React from "react";
import { cn } from "@/lib/utils";

interface BlurCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const BlurCard = ({ children, className, hover = true, ...props }: BlurCardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 glass-card",
        hover && "hoverable",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { BlurCard };