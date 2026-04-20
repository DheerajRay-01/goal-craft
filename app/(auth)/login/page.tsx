"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import LoginForm from "@/components/auth/loginForm";

export default function LoginPage() {
  const router = useRouter();

  const {
    data: session,
    status,
  } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/experiences");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
}