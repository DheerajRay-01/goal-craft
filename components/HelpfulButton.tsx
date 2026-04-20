"use client";

import { ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function HelpfulButton({
  experienceId,
  initialCount,
  helpFullUsers,
  user,
}: {
  experienceId: string;
  initialCount: number;
  helpFullUsers: any[];
  user: string;
}) {
  const [isHelpful, setIsHelpful] = useState(
    helpFullUsers?.some(
      (id) => id.toString() === user?.toString()
    )
  );


  console.log("user", user);
  

  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/experience/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ experienceId }),
      });

      const data = await res.json();

      if (data.success) {
        const helpful = data.data?.helpful ?? false;

        setIsHelpful(helpful);

        if (helpful) {
          setCount((prev) => prev + 1);
        } else {
          setCount((prev) => Math.max(0, prev - 1));
        }
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
  <button
  onClick={handleClick}
  disabled={loading}
  className={`group flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium
  transition-all duration-200 active:scale-95
  ${
    isHelpful
      ? "bg-primary text-white shadow-sm"
      : "bg-white border border-[#dbeafe] text-muted-foreground hover:bg-[#e0f2fe]"
  }
  ${loading ? "opacity-60 cursor-not-allowed" : ""}
  `}
>
  <ThumbsUp
    size={14}
    className={`transition ${
      isHelpful ? "fill-white" : "group-hover:text-primary"
    }`}
  />

  <span>{count}</span>
</button>
  );
}