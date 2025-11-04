import { Loader2 } from "lucide-react";

interface SuspenseLoaderProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  text?: string;
}

export function SuspenseLoader({ size = "md", fullScreen = true, text }: SuspenseLoaderProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const containerClasses = fullScreen
    ? "flex min-h-screen items-center justify-center"
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-3">
        <Loader2 className={`text-primary animate-spin ${sizeClasses[size]}`} />
        {text && <p className="text-foreground/60 text-sm font-medium">{text}</p>}
      </div>
    </div>
  );
}
