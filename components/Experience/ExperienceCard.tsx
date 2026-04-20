"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

import {
  MapPin,
  Briefcase,
  Clock,
  Building2,
} from "lucide-react";

import { ToggleSave } from "./ToggleSave";
import HelpfulButton from "../HelpfulButton";

export default function ExperienceCard({ data, user }: any) {
  const formattedDate = new Date(data.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

  return (
    <Link href={`/experiences/${data.slug}`} className="block h-full group">
      <Card className="h-full rounded-2xl border border-[#dbeafe] bg-gradient-to-b from-white to-[#f0f9ff] shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-hover hover:border-primary/40">

        <CardContent className="flex h-full flex-col p-5">

          {/* 🔥 HEADER (FIXED ALIGNMENT) */}
          <div className="flex items-start gap-4">

            {/* ICON */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e0f2fe] border border-[#bae6fd]">
              <Building2 className="h-6 w-6 text-primary" />
            </div>

            {/* RIGHT */}
            <div className="flex-1 min-w-0">

              {/* COMPANY + ROLE */}
              <div>
                <h2 className="text-base font-semibold text-foreground truncate">
                  {data.companyName}
                </h2>

                <p className="text-sm text-muted-foreground">
                  {data.role}
                </p>
              </div>

              {/* USER */}
             <Link
  href={`/u/${data.user?.username}`}
  onClick={(e) => e.stopPropagation()}
  className="mt-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition"
>
  <span>by</span>

  <span className="font-medium text-primary underline">
    @{data.user?.username}
  </span>
</Link>

            </div>
          </div>

          {/* 🔥 META */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {[ 
              { icon: MapPin, value: data.location },
              { icon: Briefcase, value: data.employmentType },
              { icon: Clock, value: data.experienceLevel },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <span
                  key={i}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e0f2fe] text-primary border border-[#bae6fd]"
                >
                  <Icon size={12} />
                  {item.value}
                </span>
              );
            })}
          </div>

          {/* 🔥 SUMMARY */}
          <div className="mt-4 rounded-xl bg-[#f0f9ff] border border-[#bae6fd] p-3">
            <p className="text-sm font-medium text-foreground">
              {data.rounds?.length || 0} Interview Rounds
            </p>

            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {data.overallExperience}
            </p>
          </div>

          {/* 🔥 SKILLS */}
          <div className="mt-4 flex flex-wrap gap-2">
            {data.skills?.slice(0, 4).map((skill: string, i: number) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-md bg-[#e0f2fe] text-primary border border-[#bae6fd]"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* 🔥 QUESTION */}
          {data.questions?.length > 0 && (
            <div className="mt-4 rounded-xl border-l-4 border-primary bg-gradient-to-r from-[#e0f2fe] to-[#bae6fd] px-4 py-3">
              <p className="text-sm italic text-muted-foreground line-clamp-2">
                "{data.questions[0]}"
              </p>
            </div>
          )}

          {/* 🔥 FOOTER */}
          <div className="mt-auto flex items-center justify-between pt-4 mt-5 border-t border-[#dbeafe]">

            {/* LEFT */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {formattedDate}
              </span>

              <div onClick={(e) => e.preventDefault()}>
                <HelpfulButton
                  experienceId={data._id}
                  helpFullUsers={data.helpfulUsers}
                  user={user || ""}
                  initialCount={data.helpfulVotes}
                />
              </div>
            </div>

            {/* RIGHT (BOOKMARK) */}
            <div onClick={(e) => e.preventDefault()}>
              <ToggleSave postId={data._id} />
            </div>

          </div>

        </CardContent>
      </Card>
    </Link>
  );
}