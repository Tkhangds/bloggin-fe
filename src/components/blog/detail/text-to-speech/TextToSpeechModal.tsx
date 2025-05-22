"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { Loader2, Mic, Pause, Play } from "lucide-react";
import { useState } from "react";

export default function TextToSpeechModal() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("english");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayPause = () => {
    // This would normally connect to an API, but we're just showing the UI
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsPlaying(!isPlaying);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Mic className="h-4 w-4" />
          Text to Speech
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Text to Speech</DialogTitle>
          <DialogDescription>
            Convert your text to natural-sounding speech in Vietnamese or
            English.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="language">Language</Label>
            <div className="flex space-x-2">
              <Toggle
                pressed={language === "english"}
                onPressedChange={() => setLanguage("english")}
                variant="outline"
                className="px-4"
              >
                English
              </Toggle>
              <Toggle
                pressed={language === "vietnamese"}
                onPressedChange={() => setLanguage("vietnamese")}
                variant="outline"
                className="px-4"
              >
                Tiếng Việt
              </Toggle>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="text">Text</Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                language === "english"
                  ? "Enter text to convert to speech..."
                  : "Nhập văn bản để chuyển thành giọng nói..."
              }
              className="min-h-[120px]"
            />
          </div>
          <div className="flex items-center justify-center py-2">
            {isPlaying ? (
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={handlePlayPause}
              >
                <Pause className="h-6 w-6" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={handlePlayPause}
                disabled={!text.trim() || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
