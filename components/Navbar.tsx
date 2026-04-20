"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  Menu,
  X,
  PlusCircle,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">

        {/* 🔥 Logo */}
      <Link href="/" className="flex items-center gap-2">
  <Image
    src="/logo.png" // 🔥 your public logo
    alt="GoalCraft"
    width={36}
    height={36}
    className="rounded-lg"
    priority
  />
  <span className="text-lg font-semibold tracking-tight">
    GoalCraft
  </span>
</Link>

        {/* 🔥 Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/experiences"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Experiences
          </Link>

          <Link
            href="/experiences/create"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Share
          </Link>
        </nav>

        {/* 🔥 Actions */}
        <div className="hidden md:flex items-center gap-3">

          {user ? (
            <>
              {/* Primary CTA */}
              <Link href="/experiences/create">
                <Button className="rounded-lg px-4 bg-primary hover:bg-accent">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New
                </Button>
              </Link>

              {/* Avatar */}
              <Link href={`/me`}>
                <Avatar className="h-9 w-9 border cursor-pointer hover:scale-105 transition">
                  <AvatarImage />
                  <AvatarFallback>
                    {user.fullName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>

              {/* Logout minimal */}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-muted-foreground hover:text-destructive transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="rounded-lg">
                  Sign In
                </Button>
              </Link>

              <Link href="/signup">
                <Button className="rounded-lg px-4 bg-primary hover:bg-accent">
                  Get Started
                </Button>
              </Link>
            </>
          )}

        </div>

        {/* 🔥 Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-muted"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* 🔥 Mobile Menu */}
      {mobileOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="px-4 py-4 space-y-2">

            <Link href="/experiences" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Experiences
              </Button>
            </Link>

            <Link href="/experiences/create" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                <PlusCircle className="mr-2 h-4 w-4" />
                Share Experience
              </Button>
            </Link>

            {user ? (
              <>
                <Link href={`/me`} onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                </Link>

                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-accent">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}