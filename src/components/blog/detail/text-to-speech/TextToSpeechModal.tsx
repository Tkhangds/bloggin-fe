"use client";

import Loading from "@/components/loading/loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePost } from "@/hooks/apis/usePost";
import { Post } from "@/types/post";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

export default function TextToSpeechModal({ post }: { post: Post }) {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const { mutateAsync: getPostAudio, isPending: loading } =
    usePost().useGetPostAudioByPostId();

  useEffect(() => {
    console.log("language", language);
    const fetchAudio = async () => {
      if (language === "en") {
        if (post?.enVoiceUrl) {
          setAudioURL(post.enVoiceUrl);
          console.log("enAudio", post.enVoiceUrl);
        } else {
          try {
            const res = await getPostAudio({
              postId: post.id,
              language: "en",
            });
            setAudioURL(res);
            console.log("resEN", res);
          } catch (err) {
            console.error("Failed to fetch audio:", err);
          }
        }
      }

      if (language === "vn") {
        if (post?.vnVoiceUrl) {
          setAudioURL(post.vnVoiceUrl);
        } else {
          try {
            const res = await getPostAudio({
              postId: post.id,
              language: "vn",
            });
            setAudioURL(res);
            console.log("resVN", res);
          } catch (err) {
            console.error("Failed to fetch audio:", err);
          }
        }
      }
    };

    fetchAudio();
  }, [language]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Play className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Text to Speech</DialogTitle>
          <DialogDescription>
            Listen to our voice reading your text. You can choose between
            English and Vietnamese.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="language">Language</Label>
            <div className="flex space-x-2">
              <ToggleGroup type="single" value={language} className="flex">
                <ToggleGroupItem
                  variant={"outline"}
                  value="en"
                  className="px-4"
                  onClick={() => {
                    setLanguage("en");
                  }}
                >
                  English
                </ToggleGroupItem>
                <ToggleGroupItem
                  variant={"outline"}
                  value="vn"
                  className="px-4"
                  onClick={() => {
                    setLanguage("vn");
                  }}
                >
                  Tiếng Việt
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div className="flex items-center justify-center py-2">
            {audioURL && !loading ? (
              <audio
                key={audioURL}
                controlsList="nodownload"
                autoPlay
                className="w-full"
                controls
              >
                <source src={audioURL} type="audio/mp4" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
