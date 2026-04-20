"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Mail,
  GraduationCap,
  Briefcase,
  Pencil,
  AlertCircle,
} from "lucide-react";

export default function UserProfile({ user }: any) {
  const profileIncomplete =
    !user?.bio ||
    !user?.education?.university ||
    !user?.experiences?.length;

  return (
    <div className="space-y-8">

      {/* 🔥 HERO HEADER */}
      <Card className="rounded-2xl border border-[#dbeafe] bg-gradient-to-b from-white to-[#f0f9ff] shadow-sm">
        <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20 border-2 border-[#bae6fd]">
              <AvatarImage src={user?.avatar || ""} />
              <AvatarFallback className="text-xl font-semibold bg-[#e0f2fe] text-primary">
                {user?.fullName?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <div>
                <h1 className="text-2xl font-bold">
                  {user?.fullName || "User"}
                </h1>

                <p className="text-sm text-primary font-medium">
                  @{user?.username}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Mail size={14} />
                  {user?.email}
                </span>

                <Badge className="rounded-lg bg-[#e0f2fe] text-primary">
                  {user?.userCategory}
                </Badge>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <Link href="/me/edit">
            <Button className="rounded-xl px-5 bg-primary text-white hover:bg-primary/90">
              <Pencil size={15} className="mr-2" />
              Edit Profile
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* 🔥 BIO */}
      <Card className="rounded-2xl border border-[#dbeafe] bg-white shadow-sm">
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>

        <CardContent>
          {user?.bio ? (
            <p className="leading-7 text-muted-foreground">
              {user.bio}
            </p>
          ) : (
            <p className="italic text-muted-foreground">
              No bio added yet
            </p>
          )}
        </CardContent>
      </Card>

      {/* 🔥 EDUCATION */}
      <Card className="rounded-2xl border border-[#dbeafe] bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center gap-2">
          <GraduationCap size={18} className="text-primary" />
          <CardTitle>Education</CardTitle>
        </CardHeader>

        <CardContent>
          {user?.education?.university ? (
            <div className="rounded-xl border border-[#e0f2fe] bg-[#f0f9ff] p-5 space-y-2">
              <p className="font-semibold">
                {user.education.university}
              </p>

              <p className="text-sm text-muted-foreground">
                {user.education.degree} • {user.education.branch}
              </p>

              <p className="text-sm text-muted-foreground">
                Graduation: {user.education.graduationYear}
              </p>
            </div>
          ) : (
            <p className="italic text-muted-foreground">
              Education not added
            </p>
          )}
        </CardContent>
      </Card>

      {/* 🔥 EXPERIENCE */}
      <Card className="rounded-2xl border border-[#dbeafe] bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center gap-2">
          <Briefcase size={18} className="text-primary" />
          <CardTitle>Experience</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {user?.experiences?.length > 0 ? (
            user.experiences.map((exp: any, i: number) => (
              <div
                key={i}
                className="rounded-xl border border-[#e0f2fe] bg-[#f0f9ff] p-5 hover:shadow-sm transition"
              >
                <p className="font-semibold">
                  {exp.companyName}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {exp.jobTitle}
                </p>

                <p className="text-xs text-muted-foreground">
                  {exp.location}
                </p>
              </div>
            ))
          ) : (
            <p className="italic text-muted-foreground">
              No experience added
            </p>
          )}
        </CardContent>
      </Card>

      {/* 🔥 CREATED POSTS */}
    <div className="space-y-4">

  {/* HEADER */}
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold">Created Posts</h2>

    {user?.createdPosts?.length > 0 && (
      <Link
        href={`/u/${user.username}/posts`}
        className="text-sm text-blue-600 hover:underline"
      >
        View All Posts →
      </Link>
    )}
  </div>

  {/* POSTS GRID */}
  {user?.createdPosts?.length > 0 ? (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {user.createdPosts.map((p: any, i: number) => (
        <Link key={i} href={`/experiences/${p.slug}`} className="group">

          <div className="h-full rounded-2xl border border-blue-100 
            bg-gradient-to-b from-white to-blue-50 p-5 
            transition-all duration-300 hover:shadow-xl 
            hover:-translate-y-1 hover:border-blue-300">

            {/* HEADER */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition">
                {p.companyName}
              </h3>

              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md">
                {p.role}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-3 text-sm text-gray-600 line-clamp-3">
              {p.overallExperience || "No description"}
            </p>

            {/* FOOTER */}
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>👍 {p.helpfulVotes || 0}</span>

              <span>
                {new Date(p.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

          </div>
        </Link>
      ))}
    </div>
  ) : (
    <p className="italic text-muted-foreground">
      No posts yet
    </p>
  )}

</div>


{/* 🔥 SAVED POSTS */}
<div className="space-y-4">

  {/* HEADER */}
  <div className="flex items-center justify-between">
    <h2 className="text-lg font-semibold">Saved Posts</h2>

    {user?.savedPosts?.length > 0 && (
      <Link
        href={`/me/saved`}
        className="text-sm text-green-600 hover:underline"
      >
        View All Saved Posts→
      </Link>
    )}
  </div>

  {/* GRID */}
  {user?.savedPosts?.length > 0 ? (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {user.savedPosts.map((p: any, i: number) => (
        <Link key={i} href={`/experiences/${p.slug}`} className="group">

          <div className="h-full rounded-2xl border border-green-100 
            bg-gradient-to-b from-white to-green-50 p-5 
            transition-all duration-300 hover:shadow-xl 
            hover:-translate-y-1 hover:border-green-300">

            {/* HEADER */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-gray-800 group-hover:text-green-600 transition">
                {p.companyName}
              </h3>

              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-md">
                {p.role}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="mt-3 text-sm text-gray-600 line-clamp-3">
              {p.overallExperience || "No description"}
            </p>

            {/* FOOTER */}
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>👍 {p.helpfulVotes || 0}</span>

              <span>
                {new Date(p.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

          </div>
        </Link>
      ))}
    </div>
  ) : (
    <p className="italic text-muted-foreground">
      No saved posts yet
    </p>
  )}

</div>

      {/* 🔥 INCOMPLETE WARNING */}
      {profileIncomplete && (
        <Card className="rounded-2xl border border-yellow-300 bg-yellow-50 shadow-sm">
          <CardContent className="flex items-start gap-3 p-5 text-sm text-yellow-900">
            <AlertCircle size={18} className="mt-0.5" />
            <p>
              Your profile is incomplete. Completing it improves your
              credibility and helps others better understand your background.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}