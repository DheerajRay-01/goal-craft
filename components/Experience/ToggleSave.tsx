"use client";

import { BookmarkIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ToggleSaveProps {
  postId: string;
}

export function ToggleSave({
  postId,
}: ToggleSaveProps) {
  const [isLoading, setIsLoading] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  const [isSaved, setIsSaved] =
    useState(false);

  useEffect(() => {
    async function fetchSavedStatus() {
      try {
        const res = await fetch(
          `/api/save?postId=${postId}`
        );

        const data = await res.json();

        if (data.success) {
          setIsSaved(data.data.isSaved);
        }
      } catch (error) {
        console.error(
          "Failed to fetch save status",
          error
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchSavedStatus();
  }, [postId]);

  const handleSaving = async (
    pressed: boolean
  ) => {
    if (isSaving) return;

    const previousState = isSaved;

    setIsSaved(pressed);
    setIsSaving(true);

    try {
      const res = await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setIsSaved(data.data.saved);

      toast.success(
        data.data.saved
          ? "Post saved successfully"
          : "Post removed from saved"
      );
    } catch (error: any) {
      setIsSaved(previousState);

      toast.error(
        error.message ||
          "Failed to update saved post"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
<Toggle
  aria-label="Toggle bookmark"
  pressed={isSaved}
  onPressedChange={handleSaving}
  disabled={isSaving || isLoading}
  className={`h-8 w-8 p-0 rounded-lg border transition-all
    ${
      isSaved
        ? "bg-primary text-white border-primary shadow-sm"
        : "bg-white border-[#dbeafe] text-muted-foreground hover:bg-[#e0f2fe]"
    }
  `}
>
  <BookmarkIcon
    className={`h-4 w-4 transition ${
      isSaved ? "fill-blue-500" : ""
    }`}
  />
</Toggle>
  );
}