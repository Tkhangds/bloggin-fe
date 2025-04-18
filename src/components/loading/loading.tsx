import { Loader2 } from "lucide-react";

export default function Loading({ spinnerSize = 25 }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <Loader2
        className="animate-spin text-primary"
        size={spinnerSize}
        aria-hidden="true"
      />
    </div>
  );
}
