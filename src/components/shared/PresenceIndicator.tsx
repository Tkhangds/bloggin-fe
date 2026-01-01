"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ActiveUser } from "@/types/collaborator";

interface PresenceIndicatorProps {
  activeUsers: ActiveUser[];
  maxDisplay?: number;
}

export function PresenceIndicator({
  activeUsers,
  maxDisplay = 5,
}: PresenceIndicatorProps) {
  const displayedUsers = activeUsers.slice(0, maxDisplay);
  const remainingCount = Math.max(0, activeUsers.length - maxDisplay);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (activeUsers.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <TooltipProvider>
          <div className="flex -space-x-2">
            {displayedUsers.map((user, index) => (
              <Tooltip key={user.socketId}>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarImage
                        src={user.user?.avatarUrl}
                        alt={user.user?.displayName || "User"}
                      />
                      <AvatarFallback className="text-xs">
                        {user.user
                          ? getInitials(user.user.displayName)
                          : "??"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background bg-green-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-medium">
                      {user.user?.displayName || "Unknown User"}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {user.role}
                    </Badge>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}

            {remainingCount > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <Avatar className="h-8 w-8 border-2 border-background">
                      <AvatarFallback className="text-xs">
                        +{remainingCount}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{remainingCount} more active user(s)</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </TooltipProvider>
      </div>

      <div className="text-sm text-muted-foreground">
        {activeUsers.length} active
      </div>
    </div>
  );
}
