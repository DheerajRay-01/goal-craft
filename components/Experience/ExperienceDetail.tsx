import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };


  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?._id;


  console.log(post);
  

  return (
    <div className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 lg:px-6 lg:py-10 space-y-6 sm:space-y-8">

      {/* 🔥 HERO HEADER */}
      <div className="rounded-3xl border border-[#dbeafe] bg-gradient-to-b from-white to-[#f0f9ff] p-4 sm:p-6 lg:p-8 shadow-soft flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

        <div className="space-y-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold">
              {post.companyName}
            </h1>

            <p className="mt-1 sm:mt-2 text-sm sm:text-base font-medium text-primary">
              {post.role}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
              <MapPin size={14} />
              {post.location}
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
              <Calendar size={14} />
              {formatDate(post.interviewDate)}
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
              {/* <User size={14} /> */}
              {/* <span className="text-primary font-medium">
                @{post.user?.username}
              </span> */}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{post.employmentType}</Badge>
            <Badge variant="outline">{post.experienceLevel}</Badge>
          </div>
        </div>

        {/* 🔥 ACTIONS */}
        <div className="flex items-center gap-2 flex-wrap">
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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          ["Interview Rounds", post.rounds?.length],
          ["Skills Covered", post.skills?.length],
          ["Questions", post.questions?.length],
          ["Helpful Votes", post.helpfulVotes],
        ].map(([label, value]) => (
          <div
            key={label}
          className="rounded-xl border p-3 sm:p-5 text-center"
          >
            <p className="text-xs uppercase text-muted-foreground">
              {label}
            </p>
            <p className="mt-2 text-lg sm:text-2xl font-bold text-primary">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* 🔥 MAIN GRID */}
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">

        {/* LEFT */}
        <div className="space-y-6 lg:col-span-2">

          <Card className="rounded-2xl border border-[#dbeafe] bg-white shadow-soft">
            <CardHeader>
              <CardTitle>Skills & Topics</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {post.skills?.map((skill: string, i: number) => (
                <Badge key={i} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-[#dbeafe] bg-white shadow-soft">
            <CardHeader>
              <CardTitle>Interview Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {post.rounds?.map((round: any, i: number) => (
                <div key={i} className="flex gap-3 sm:gap-4">
                  <div className="flex h-7 w-7 sm:h-9 sm:w-9 text-xs sm:text-base shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] text-primary font-medium">
                    {i + 1}
                  </div>

                  <div>
                    <p className="text-sm sm:text-base font-medium">{round.title}</p>
                    <p className="mt-1 text-xs sm:text-sm">
                      {round.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-[#dbeafe] bg-white shadow-soft">
            <CardHeader>
              <CardTitle>Experience Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm leading-6 sm:leading-7">
                {post.overallExperience}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-[#dbeafe] bg-white shadow-soft">
            <CardHeader>
              <CardTitle>Questions Asked</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {post.questions?.map((q: string, i: number) => (
                <div
                  key={i}
                  className="flex gap-2 sm:gap-3 px-3 py-2"
                >
                  <span className="font-semibold text-primary">
                    Q{i + 1}.
                  </span>
                  <p className="text-xs sm:text-sm">{q}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-24 h-fit">

          <Card className="rounded-2xl border border-[#dbeafe] bg-white shadow-soft">
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {post.resources?.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No resources available
                </p>
              )}

              {post.resources?.map((r: any, i: number) => (
             <div
  key={i}
  className="flex items-center justify-between rounded-xl border border-[#dbeafe] p-3 hover:bg-[#f0f9ff] transition"
>
  <div className="flex items-center gap-2 min-w-0">
    <FileText size={16} className="text-primary shrink-0" />

    <span className="truncate text-sm">
      {r.fileName}
    </span>
  </div>

  <div className="flex items-center gap-3">
    {/* ⬇ Download */}
   <FileActions url={r?.url} />
  </div>
</div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-[#dbeafe] bg-white shadow-soft">
            <CardHeader>
              <CardTitle>Engagement</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-primary">
                  {post.helpfulVotes}
                </p>
                <p className="text-xs text-muted-foreground">
                  Helpful
                </p>
              </div>

              {/* <div>
                <p className="text-xl font-bold text-primary">
                  {post.helpfulUsers?.length}
                </p>
                <p className="text-xs text-muted-foreground">
                  Users
                </p>
              </div> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}