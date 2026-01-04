"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share2, Users } from "lucide-react";
import { CollaboratorManager } from "./CollaboratorManager";
import { ConnectionStatus } from "./ConnectionStatus";
import { PresenceIndicator } from "./PresenceIndicator";
import type { ActiveUser } from "@/types/collaborator";
import { Badge } from "@/components/ui/badge";

interface ShareCollaborateDialogProps {
  draftId: string;
  currentUserId: string;
  authorId?: string;
  isCollaborative?: boolean;
  isConnected?: boolean;
  activeUsers?: ActiveUser[];
  onEnableCollaboration?: () => void;
  onDisableCollaboration?: () => void;
}

export function ShareCollaborateDialog({
  draftId,
  currentUserId,
  authorId,
  isCollaborative = false,
  isConnected = false,
  activeUsers = [],
  onEnableCollaboration,
  onDisableCollaboration,
}: ShareCollaborateDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // If no collaboration props provided, we're in standalone mode (just managing collaborators)
  const isStandaloneMode = !onEnableCollaboration && !onDisableCollaboration;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
          {isCollaborative && !isStandaloneMode && (
            <Badge variant="secondary" className="ml-2">
              Live
            </Badge>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share & Collaborate</DialogTitle>
          <DialogDescription>
            Invite collaborators to {isStandaloneMode ? 'view or edit' : 'edit in real-time with'} this draft
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="collaborators" className="w-full">
          {isStandaloneMode ? (
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="collaborators">
                <Users className="mr-2 h-4 w-4" />
                Collaborators
              </TabsTrigger>
            </TabsList>
          ) : (
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="collaborators">
                <Users className="mr-2 h-4 w-4" />
                Collaborators
              </TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="collaborators" className="space-y-4">
            <CollaboratorManager
              draftId={draftId}
              currentUserId={currentUserId}
              authorId={authorId}
            />
          </TabsContent>

          {!isStandaloneMode && (
            <TabsContent value="settings" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h4 className="font-medium">Real-time Collaboration</h4>
                  <p className="text-sm text-muted-foreground">
                    Enable live editing with other collaborators
                  </p>
                </div>
                {isCollaborative ? (
                  <Button
                    variant="destructive"
                    onClick={onDisableCollaboration}
                  >
                    Disable
                  </Button>
                ) : (
                  <Button onClick={onEnableCollaboration}>Enable</Button>
                )}
              </div>

              {isCollaborative && (
                <>
                  <div className="space-y-2 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Connection Status</h4>
                      <ConnectionStatus isConnected={isConnected} />
                    </div>
                  </div>

                  <div className="space-y-2 rounded-lg border p-4">
                    <h4 className="font-medium mb-3">Active Users</h4>
                    {activeUsers.length > 0 ? (
                      <PresenceIndicator
                        activeUsers={activeUsers}
                        maxDisplay={10}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No other users are currently editing
                      </p>
                    )}
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="font-medium mb-2">How it works</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Changes are synced in real-time</li>
                      <li>• You can see other users' cursors</li>
                      <li>• Auto-saves every few seconds</li>
                      <li>• Viewers can only read, not edit</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
