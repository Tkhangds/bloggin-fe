"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectionStatusProps {
  isConnected: boolean;
  className?: string;
}

export function ConnectionStatus({
  isConnected,
  className,
}: ConnectionStatusProps) {
  return (
    <Badge
      variant={isConnected ? "default" : "destructive"}
      className={cn("flex items-center gap-1.5", className)}
    >
      {isConnected ? (
        <>
          <Wifi className="h-3 w-3" />
          <span>Connected</span>
        </>
      ) : (
        <>
          <WifiOff className="h-3 w-3" />
          <span>Disconnected</span>
        </>
      )}
    </Badge>
  );
}

interface ConnectionStatusWithReconnectProps {
  isConnected: boolean;
  isReconnecting?: boolean;
  className?: string;
}

export function ConnectionStatusWithReconnect({
  isConnected,
  isReconnecting = false,
  className,
}: ConnectionStatusWithReconnectProps) {
  if (isReconnecting) {
    return (
      <Badge variant="secondary" className={cn("flex items-center gap-1.5", className)}>
        <Loader2 className="h-3 w-3 animate-spin" />
        <span>Reconnecting...</span>
      </Badge>
    );
  }

  return <ConnectionStatus isConnected={isConnected} className={className} />;
}
