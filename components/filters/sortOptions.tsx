"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Most Helpful", value: "mostHelpful" },
  { label: "Latest Interview Date", value: "latestInterview" },
];

export default function SortDropdown({
  basePath,
}: {
  basePath: string; // 🔥 important
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "newest";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", "1");
    params.set("sort", value);

    router.push(`${basePath}?${params.toString()}`);
  };

  return (
    <Select value={currentSort} onValueChange={handleChange}>
      
      {/* 🔥 TRIGGER */}
      <SelectTrigger
        className="
        h-9 w-[200px] rounded-lg 
        border border-[#dbeafe] 
        bg-white 
        px-3 text-sm 
        shadow-soft 
        hover:bg-[#f0f9ff] 
        focus:ring-2 focus:ring-primary/20
      "
      >
        <div className="flex items-center gap-2 text-muted-foreground">
          
          {/* ICON */}
          <div className="p-1 rounded-md bg-[#e0f2fe]">
            <ArrowUpDown className="h-3.5 w-3.5 text-primary" />
          </div>

          {/* TEXT */}
          <SelectValue />
        </div>
      </SelectTrigger>

      {/* 🔥 DROPDOWN */}
      <SelectContent className="rounded-xl border border-[#dbeafe] shadow-lg bg-white">
        {SORT_OPTIONS.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer text-sm rounded-md hover:bg-[#e0f2fe] focus:bg-[#e0f2fe]"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}