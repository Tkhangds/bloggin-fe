import { Button } from "@/components/ui/button";

export function TopicHeader() {
  return (
    <div className="mb-12 text-center">
      <h1 className="mb-4 text-5xl font-bold">Culture</h1>
      <div className="mb-6 text-gray-600">
        <span>Topic</span>

        <span className="mx-2">•</span>
        <span>328K stories</span>
      </div>
    </div>
  );
}
