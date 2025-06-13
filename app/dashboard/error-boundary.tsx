"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError] = useState(false);

  if (hasError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load data. Please try again later.</AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
}