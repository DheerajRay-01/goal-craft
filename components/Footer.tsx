"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-background/70 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* 🔥 TOP */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* BRAND */}
          <div>
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

            <p className="text-sm text-muted-foreground mt-3 max-w-sm leading-relaxed">
              Share real interview experiences, explore insights, and prepare
              smarter with a community-driven platform.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-foreground">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-primary transition">
                Home
              </Link>
              <Link href="/experiences" className="text-muted-foreground hover:text-primary transition">
                Explore
              </Link>
              <Link href="/experiences/create" className="text-muted-foreground hover:text-primary transition">
                Share Experience
              </Link>
            </div>
          </div>

          {/* CONNECT */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-foreground">
              Connect
            </h3>

            <div className="flex flex-col gap-3 text-sm">

              <a
                href="mailto:your@email.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>

              <a
                href="https://github.com"
                target="_blank"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>

            </div>
          </div>

        </div>

        {/* 🔥 DIVIDER */}
        <div className="mt-10 border-t pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">

          <p>
            © {new Date().getFullYear()} GoalCraft. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="hover:text-primary cursor-pointer transition">
              Privacy
            </span>
            <span className="hover:text-primary cursor-pointer transition">
              Terms
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}