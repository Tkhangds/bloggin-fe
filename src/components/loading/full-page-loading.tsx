import { Loader2 } from "lucide-react";

export default function FullPageLoading({
  text = "Loading...",
  spinnerSize = 40,
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <Loader2
        className="animate-spin text-primary"
        size={spinnerSize}
        aria-hidden="true"
      />
      {text && (
        <p className="mt-4 text-lg text-muted-foreground" aria-live="polite">
          {text}
        </p>
      )}
      <span className="sr-only">Loading content, please wait</span>
    </div>
  );
}
