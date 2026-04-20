import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import {
  MapPin,
  Calendar,
  User,
  FileText,
} from "lucide-react";

import DeleteAndEditBtn from "./DeleteAndEditBtn";
import { ToggleSave } from "./ToggleSave";
import HelpfulButton from "../HelpfulButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import FileActions from "./FileActions";



export default async function ExperienceDetail({ post, isOwner }: any) {
  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?._id;

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-4 py-5 sm:py-8 space-y-5 sm:space-y-8">

      {/* 🔥 HERO */}
      <div className="rounded-2xl sm:rounded-3xl border bg-gradient-to-b from-white to-[#f0f9ff] p-4 sm:p-6 lg:p-8 shadow-soft flex flex-col gap-4 sm:gap-6 md:flex-row md:justify-between">

        {/* LEFT */}
        <div className="space-y-3 sm:space-y-4">

          <div>
            <h1 className="text-lg sm:text-2xl lg:text-4xl font-bold leading-tight">
              {post.companyName}
            </h1>

            <p className="mt-1 text-sm sm:text-base text-primary font-medium">
              {post.role}
            </p>
          </div>

          {/* META */}


<div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">

  {/* LOCATION */}
  <div className="flex items-center gap-1">
    <MapPin size={12} />
    <span className="truncate max-w-[120px] sm:max-w-none">
      {post.location}
    </span>
  </div>

  {/* DATE */}
  <div className="flex items-center gap-1">
    <Calendar size={12} />
    {formatDate(post.interviewDate)}
  </div>

  {/* 🔥 USERNAME */}
  {post.user?.username && (
    <Link
      href={`/u/${post.user.username}`}
      className="flex items-center gap-1 hover:text-primary transition"
    >
      <User size={12} />
      <span className="font-medium text-primary underline">
        @{post.user.username}
      </span>
    </Link>
  )}

</div>

          {/* BADGES */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-[10px] sm:text-xs">
              {post.employmentType}
            </Badge>
            <Badge variant="outline" className="text-[10px] sm:text-xs">
              {post.experienceLevel}
            </Badge>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap items-center gap-2">
          <HelpfulButton
            experienceId={post._id}
            helpFullUsers={post.helpfulUsers}
            user={currentUserId || ""}
            initialCount={post.helpfulVotes}
          />
          <ToggleSave postId={post._id} />
          {isOwner && <DeleteAndEditBtn slug={post.slug} />}
        </div>
      </div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
        {[
          ["Rounds", post.rounds?.length],
          ["Skills", post.skills?.length],
          ["Questions", post.questions?.length],
          ["Votes", post.helpfulVotes],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border bg-white p-3 sm:p-5 text-center">
            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase">
              {label}
            </p>
            <p className="mt-1 text-lg sm:text-2xl font-bold text-primary">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* 🔥 GRID */}
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">

        {/* LEFT */}
        <div className="space-y-5 sm:space-y-6 lg:col-span-2">

          {/* SKILLS */}
          <Card className="rounded-xl sm:rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Skills & Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5 sm:gap-2">
              {post.skills?.map((skill: string, i: number) => (
                <Badge key={i} variant="secondary" className="text-[10px] sm:text-xs">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>

          {/* ROUNDS */}
          <Card className="rounded-xl sm:rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Interview Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {post.rounds?.map((round: any, i: number) => (
                <div key={i} className="flex gap-2 sm:gap-4">

                  <div className="h-7 w-7 sm:h-9 sm:w-9 text-xs sm:text-sm flex items-center justify-center rounded-full bg-[#e0f2fe] text-primary font-medium shrink-0">
                    {i + 1}
                  </div>

                  <div>
                    <p className="text-sm sm:text-base font-medium">
                      {round.title}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-5">
                      {round.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* DESCRIPTION */}
          <Card className="rounded-xl sm:rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Experience Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-muted-foreground">
                {post.overallExperience}
              </p>
            </CardContent>
          </Card>

          {/* QUESTIONS */}
          <Card className="rounded-xl sm:rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Questions Asked
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {post.questions?.map((q: string, i: number) => (
                <div key={i} className="flex gap-2 px-2 sm:px-3 py-2 rounded-lg bg-[#f0f9ff] border">
                  <span className="text-primary text-xs sm:text-sm font-semibold">
                    Q{i + 1}.
                  </span>
                  <p className="text-xs sm:text-sm">{q}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-24">

          {/* RESOURCES */}
          <Card className="rounded-xl sm:rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Resources
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 sm:space-y-3">
              {post.resources?.length === 0 && (
                <p className="text-xs sm:text-sm text-muted-foreground">
                  No resources available
                </p>
              )}

              {post.resources?.map((r: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2 p-2.5 sm:p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText size={14} />
                    <span className="truncate text-xs sm:text-sm">
                      {r.fileName}
                    </span>
                  </div>

                  <FileActions url={r?.url} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* ENGAGEMENT */}
          <Card className="rounded-xl sm:rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">
                Engagement
              </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-3 text-center">
              <div>
                <p className="text-lg sm:text-xl font-bold text-primary">
                  {post.helpfulVotes}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  Helpful
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}