"use client";

import { useState } from "react";
import ExperienceCard from "./Experience/ExperienceCard";


interface Props {
  allPosts: any[];
  savedPosts: any[];
}

export default function PostTabs({ allPosts, savedPosts }: Props) {
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");

  const postsToShow = activeTab === "all" ? allPosts : savedPosts;

  return (
    <div className="space-y-6">

      {/* 🔥 TOP NAV */}
      <div className="flex gap-4 border-b pb-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-xl text-sm font-medium ${
            activeTab === "all"
              ? "bg-black text-white"
              : "bg-muted text-muted-foreground"
          }`}
        >
          All Posts ({allPosts.length})
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`px-4 py-2 rounded-xl text-sm font-medium ${
            activeTab === "saved"
              ? "bg-black text-white"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Saved Posts ({savedPosts.length})
        </button>
      </div>

      {/* 🔥 CONTENT */}
      {postsToShow.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          No posts found
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {postsToShow.map((post) => (
            <ExperienceCard key={post._id} data={post} />
          ))}
        </div>
      )}
    </div>
  );
}