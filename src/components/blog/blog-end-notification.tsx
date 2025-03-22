import { Heart } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function BlogEndNotification(): JSX.Element {
  return (
    <Card className="border border-dashed border-neutral-400/10 bg-background/10">
      <CardContent className="flex flex-col items-center px-6 py-4">
        <div className="mb-1.5 flex items-center gap-3">
          <p className="text-sm font-medium text-muted-foreground">
            You have reached the end :&gt;
          </p>
        </div>
        <p className="text-xs text-muted-foreground/80">
          Thanks for scrolling this far!
        </p>
      </CardContent>
    </Card>
  );
}
