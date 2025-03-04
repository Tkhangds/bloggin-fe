"use client";

import type React from "react";
import { useState } from "react";
import {
  Camera,
  User,
  MapPin,
  Mail,
  Phone,
  FileText,
  Heart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProfilePage() {
  const [avatar, setAvatar] = useState<string>(
    "/placeholder.svg?height=100&width=100",
  );
  const [username, setUsername] = useState<string>("johndoe");
  const [gender, setGender] = useState<string>("male");
  const [location, setLocation] = useState<string>("New York, USA");
  const [email, setEmail] = useState<string>("john.doe@example.com");
  const [phone, setPhone] = useState<string>("+1 (555) 123-4567");
  const [activeTab, setActiveTab] = useState<string>("profile");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatar(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 xl:px-48">
      <h1 className="mb-8 text-3xl font-bold">Profile Settings</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Left Column - Navigation */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
              <CardDescription>Manage your profile and content</CardDescription>
            </CardHeader>
            <CardContent className="p-0 xl:p-2">
              <div className="space-y-1">
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant={activeTab === "posts" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("posts")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  My Posts
                </Button>
                <Button
                  variant={activeTab === "favorites" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("favorites")}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Favorites
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - User Information */}
        <div className="md:col-span-3">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
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
                          onChange={handleAvatarChange}
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
                      <Label htmlFor="username">Username</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="username"
                          placeholder="Username"
                          className="pl-9"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email address"
                          className="pl-9"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
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
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" variant="outline" className="mr-2">
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === "posts" && (
            <Card>
              <CardHeader>
                <CardTitle>My Posts</CardTitle>
                <CardDescription>View and manage your posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-12 text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No posts yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You haven't created any posts yet. Start sharing your
                    content!
                  </p>
                  <Button className="mt-4">Create Post</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "favorites" && (
            <Card>
              <CardHeader>
                <CardTitle>Favorites</CardTitle>
                <CardDescription>View your favorite content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-12 text-center">
                  <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No favorites yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You haven't added any content to your favorites yet.
                  </p>
                  <Button className="mt-4">Browse Content</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
