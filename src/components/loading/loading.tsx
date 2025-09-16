import { Loader2 } from "lucide-react";

export default function Loading({
  spinnerSize = 25,
  className = "",
}: {
  spinnerSize?: number;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      role="status"
      aria-live="polite"
    >
      <Loader2
        className="animate-spin text-primary"
        size={spinnerSize}
        aria-hidden="true"
      />
        <span className="sr-only">Loading…</span>
    </div>
  );
}
