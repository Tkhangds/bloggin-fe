"use client";

import type React from "react";

import { Camera, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";

import FullPageLoading from "@/components/loading/full-page-loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/context/AuthContext";
import { useUser } from "@/hooks/apis/useUser";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, loading } = useAuthContext();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUser().useUpdateUser();
  const { mutateAsync: updateAvatar, isPending: isUpdatingAvatar } =
    useUser().useUpdateAvatar();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string>(
    `https://api.dicebear.com/9.x/initials/svg?seed=${user?.displayName ?? "N/A"}`,
  );

  const [displayName, setDisplayName] = useState<string>(
    user?.displayName ?? "",
  );

  useEffect(() => {
    if (user) {
      setAvatar(
        user.avatarUrl ||
          `https://api.dicebear.com/9.x/initials/svg?seed=${user.displayName}`,
      );
      setDisplayName(user.displayName);
    }
  }, [user]);

  if (loading) {
    return (
      <FullPageLoading text="We are preparing everything for you!"></FullPageLoading>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    if (avatarFile) {
      try {
        await updateAvatar({ data: avatarFile });
      } catch (error) {
        console.error("Error updating avatar:", error);
        toast.error("Failed to update avatar");
      }
    }

    if (displayName !== user?.displayName) {
      try {
        await updateUser({ data: { displayName } });
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Failed to update user");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatar} alt="Profile" />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2">
                <Label
                  htmlFor="avatar-upload"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Upload avatar</span>
                </Label>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setAvatarFile(file);
                    if (file) {
                      const fileUrl = URL.createObjectURL(file);
                      setAvatar(fileUrl);
                    }
                  }}
                />
              </div>
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-medium">Profile Picture</h3>
              <p className="text-sm text-muted-foreground">
                Upload a new avatar or keep your current one
              </p>
            </div>
          </div>

          <Separator />

          {/* User Information Form */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="username">Display Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="Username"
                  className="pl-9"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="City, Country"
                  className="pl-9"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div> */}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  className="pl-9"
                  value={user?.email}
                  readOnly
                  disabled
                />
              </div>
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Phone number"
                  className="pl-9"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div> */}
          </div>

          <div className="flex justify-end">
            <Button disabled={isUpdatingUser || isUpdatingAvatar} type="submit">
              {isUpdatingUser || isUpdatingAvatar
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
