import { forwardRef } from "react";

const LoadBlogIndicator = forwardRef<HTMLDivElement, { isLoading: boolean }>(
  ({ isLoading }, ref) => {
    return (
      <div ref={ref} className="flex justify-center">
        {isLoading && (
          <div className="flex items-center justify-center space-x-2">
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        )}
      </div>
    );
  },
);

LoadBlogIndicator.displayName = "LoadBlogIndicator";

export default LoadBlogIndicator;
