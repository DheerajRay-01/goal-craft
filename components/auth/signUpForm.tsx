"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { signupSchema } from "@/utils/validations/signupschema";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { useDebounceCallback } from "usehooks-ts";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");

  const router = useRouter()

  const debounced = useDebounceCallback(setUsername, 300);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const checkUsername = async () => {
      if (!username) {
        setUsernameMessage("");
        return;
      }

      try {
        setCheckingUsername(true);
        setUsernameMessage("");

        const res = await fetch(
          `/api/check-unique-username?username=${username}`
        );

        const result = await res.json();

        if (!res.ok) {
          setUsernameMessage(result.message);
          return;
        }

        setUsernameMessage(result.message);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      } finally {
        setCheckingUsername(false);
      }
    };

    checkUsername();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.replace('/login')

      console.log(result.data);

      form.reset();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-muted to-background ">
      <Card className="w-full max-w-md shadow-xl border my-4">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Create Account
          </CardTitle>

          <CardDescription>
            Join GoalCraft and start managing your goals
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="">

              {/* FULL NAME */}

              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Full Name</FieldLabel>

                    <div className="relative">
                      <User className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                      <Input
                        {...field}
                        className="pl-9"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* USERNAME */}

              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Username</FieldLabel>

                    <div className="relative">
                      <User className="absolute left-3 top-2.5 size-4 text-muted-foreground" />

                      <Input
                        {...field}
                        className="pl-9"
                        onChange={(e) => {
                          field.onChange(e);
                          debounced(e.target.value);
                        }}
                        placeholder="Enter username"
                      />
                    </div>

                    <div className="flex items-center gap-2 mt-1 h-5">
                      {checkingUsername && (
                        <Spinner className="size-4" />
                      )}

                      {usernameMessage && (
                        <p
                          className={`text-sm ${
                            usernameMessage.includes("available")
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {usernameMessage}
                        </p>
                      )}
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* EMAIL */}

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email</FieldLabel>

                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />

                      <Input
                        {...field}
                        type="email"
                        className="pl-9"
                        placeholder="Enter email"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* PASSWORD */}

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password</FieldLabel>

                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />

                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className="pl-9 pr-10"
                        placeholder="Enter password"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-muted-foreground"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* CONFIRM PASSWORD */}

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Confirm Password</FieldLabel>

                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />

                      <Input
                        {...field}
                        type="password"
                        className="pl-9"
                        placeholder="Confirm password"
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* BUTTON */}

              <Button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2"
                disabled={
                  loading || usernameMessage === "username already taken"
                }
              >
                {loading ? (
                  <>
                    <Spinner className="size-4" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* LOGIN LINK */}

              <p className="text-center text-sm text-muted-foreground pt-2">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-primary font-medium hover:underline"
                >
                  Login
                </a>
              </p>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;