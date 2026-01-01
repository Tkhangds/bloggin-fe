"use client";

import React, { useState } from "react";
import { useCollaboratorManagement } from "@/hooks/useCollaboratorManagement";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, UserPlus, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CollaboratorManagerProps {
  draftId: string;
  currentUserId: string;
  authorId?: string;
}

export function CollaboratorManager({
  draftId,
  currentUserId,
  authorId,
}: CollaboratorManagerProps) {
  const {
    collaborators,
    isLoading,
    error,
    addCollaboratorMutation,
    updateRoleMutation,
    removeCollaboratorMutation,
    isOwner,
    currentUserRole,
  } = useCollaboratorManagement({ draftId, authorId });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCollabEmail, setNewCollabEmail] = useState("");
  const [newCollabRole, setNewCollabRole] = useState<"editor" | "viewer">(
    "editor"
  );

  const userIsOwner = isOwner(currentUserId);
  const userRole = currentUserRole(currentUserId);

  // Debug logging
  console.log("CollaboratorManager - collaborators:", collaborators);
  console.log("CollaboratorManager - userIsOwner:", userIsOwner);
  console.log("CollaboratorManager - currentUserId:", currentUserId);

  const handleAddCollaborator = () => {
    if (!newCollabEmail) return;

    addCollaboratorMutation.mutate({ email: newCollabEmail, role: newCollabRole });
    // Reset form on success
    setIsAddDialogOpen(false);
    setNewCollabEmail("");
    setNewCollabRole("editor");
  };

  const handleRoleChange = (collabId: string, role: "editor" | "viewer") => {
    updateRoleMutation.mutate({ collabId, role });
  };

  const handleRemove = (collabId: string) => {
    if (confirm("Are you sure you want to remove this collaborator?")) {
      removeCollaboratorMutation.mutate(collabId);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "editor":
        return "secondary";
      case "viewer":
        return "outline";
      default:
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-sm text-muted-foreground">Loading collaborators...</p>
      </div>
    );
  }

  // Show error if backend is not available
  if (error) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <h4 className="font-medium text-destructive mb-2">⚠️ Backend API Not Available</h4>
          <p className="text-sm mb-3">
            The collaboration feature requires a backend server. The API is either not running or not implemented yet.
          </p>
          <div className="space-y-2 text-sm">
            <p className="font-medium">Quick fixes:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Check if your backend server is running</li>
              <li>Verify <code className="bg-muted px-1 rounded text-xs">NEXT_PUBLIC_API_BASE_URL</code> in .env.local</li>
              <li>Implement the collaboration endpoints (see BACKEND_SETUP_REQUIRED.md)</li>
            </ol>
          </div>
          <div className="mt-3 p-2 bg-muted rounded text-xs">
            <p className="font-medium mb-1">Expected endpoint:</p>
            <code>GET {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/drafts/{draftId}/collaborators</code>
          </div>
          <details className="mt-3">
            <summary className="cursor-pointer text-sm font-medium hover:underline">Show technical details</summary>
            <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-32">
              {JSON.stringify({
                error: error.message,
                endpoint: `/drafts/${draftId}/collaborators`,
                draftId
              }, null, 2)}
            </pre>
          </details>
        </div>

        {/* Show example of what it will look like */}
        <div className="rounded-lg border border-dashed p-4 opacity-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Collaborators</h3>
              <Badge variant="secondary">0</Badge>
            </div>
            <Button size="sm" variant="outline" disabled>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Collaborator
            </Button>
          </div>
          <p className="text-sm text-center text-muted-foreground py-8">
            👆 This is what you'll see once the backend is set up
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Collaborators</h3>
          <Badge variant="secondary">{collaborators.length}</Badge>
        </div>

        {userIsOwner && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Collaborator
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Collaborator</DialogTitle>
                <DialogDescription>
                  Add a new collaborator to this draft. They will be able to
                  view or edit based on the role you assign.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter user email"
                    value={newCollabEmail}
                    onChange={(e) => setNewCollabEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newCollabRole}
                    onValueChange={(value: "editor" | "viewer") =>
                      setNewCollabRole(value)
                    }
                  >
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Editors can edit, viewers can only view
                  </p>
                </div>

                <Button
                  onClick={handleAddCollaborator}
                  disabled={!newCollabEmail || addCollaboratorMutation.isPending}
                  className="w-full"
                >
                  {addCollaboratorMutation.isPending
                    ? "Adding..."
                    : "Add Collaborator"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="space-y-2">
        {collaborators.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground mb-1">No collaborators yet</p>
            <p className="text-xs text-muted-foreground">
              {userIsOwner ? "Click 'Add Collaborator' to invite others" : "The owner hasn't added any collaborators"}
            </p>
          </div>
        ) : (
          collaborators.map((collab) => (
            <div
              key={collab.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={collab.user?.avatarUrl}
                    alt={collab.user?.displayName || "User"}
                  />
                  <AvatarFallback>
                    {getInitials(collab.user?.displayName || "?")}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-medium">{collab.user?.displayName || "Unknown User"}</p>
                  <p className="text-sm text-muted-foreground">
                    @{collab.user?.username || "unknown"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {userIsOwner ? (
                  <>
                    <Select
                      value={collab.role}
                      onValueChange={(value: "editor" | "viewer") =>
                        handleRoleChange(collab.id, value)
                      }
                      disabled={updateRoleMutation.isPending}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemove(collab.id)}
                      disabled={removeCollaboratorMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </>
                ) : (
                  <Badge variant={getRoleBadgeVariant(collab.role)}>
                    {collab.role}
                  </Badge>
                )}
              </div>
            </div>
          )))}
      </div>

      {!userIsOwner && (
        <p className="text-xs text-muted-foreground">
          You are viewing this draft as {userRole ? `a ${userRole}` : "the owner"}. Only the owner can manage
          collaborators.
        </p>
      )}
    </div>
  );
}
