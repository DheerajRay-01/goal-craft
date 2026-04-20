"use client";

import { useState } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
  User,
  GraduationCap,
  Briefcase,
  Plus,
  Trash2,
  Loader2,
  Mail,
  AtSign,
} from "lucide-react";

import { toast } from "sonner";
import { profileUpdateSchema } from "@/utils/validations/profileSchema";

export default function EditProfileForm({ user }: any) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      fullName: user.fullName || "",
      username: user.username || "",
      email: user.email || "",
      userCategory: user.userCategory || "Student",
      bio: user.bio || "",
      education: {
        university: user.education?.university || "",
        degree: user.education?.degree || "",
        branch: user.education?.branch || "",
        graduationYear:
          user.education?.graduationYear || "",
      },
      experiences:
        user.experiences?.length > 0
          ? user.experiences.map((exp: any) => ({
              ...exp,
              startDate: exp.startDate?.split("T")[0] || "",
              endDate: exp.endDate?.split("T")[0] || "",
            }))
          : [
              {
                companyName: "",
                jobTitle: "",
                employmentType: "",
                location: "",
                startDate: "",
                endDate: "",
                currentlyWorking: false,
              },
            ],
    },
  });

  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  async function onSubmit(values: any) {
    try {
      setLoading(true);

      const payload = {
        ...values,
        education: {
          ...values.education,
          graduationYear: Number(
            values.education.graduationYear
          ),
        },
        experiences: values.experiences.map((exp: any) => ({
          ...exp,
          endDate: exp.currentlyWorking
            ? null
            : exp.endDate || null,
        })),
      };

      const res = await fetch(`/api/user/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Profile updated successfully");
      reset(values);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl py-8 px-4 space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* 🔥 HERO */}
        <div className="rounded-2xl border border-[#dbeafe] bg-gradient-to-b from-white to-[#f0f9ff] p-6 shadow-sm">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-sm text-muted-foreground">
            Keep your profile updated for better visibility
          </p>
        </div>

        {/* 🔥 BASIC */}
        <Card className="rounded-2xl border border-[#dbeafe] bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2">
            <User size={18} className="text-primary" />
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            <Input
  placeholder="Enter your full name"
  {...register("fullName")}
/>

<Input
  placeholder="Choose a unique username"
  {...register("username")}
  disabled
  className="cursor-not-allowed opacity-80"
/>
         

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-muted-foreground h-4 w-4" />
              <Input disabled className="pl-10 h-10 border-[#dbeafe]" {...register("email")} />
            </div>

            <Controller
              control={control}
              name="userCategory"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-10 border-[#dbeafe]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Fresher">Fresher</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </CardContent>
        </Card>

        {/* 🔥 BIO */}
        <Card className="rounded-2xl border border-[#dbeafe] bg-white shadow-sm">
          <CardHeader className="flex items-center gap-2">
            <AtSign size={18} className="text-primary" />
            <CardTitle>About You</CardTitle>
          </CardHeader>

          <CardContent>
           <Textarea
  placeholder="Write a short bio about yourself (skills, interests, goals...)"
  className="min-h-[140px]"
  {...register("bio")}
/>
          </CardContent>
        </Card>

        {/* 🔥 EDUCATION */}
        <Card className="rounded-2xl border border-[#dbeafe] bg-white shadow-sm">
          <CardHeader className="flex items-center gap-2">
            <GraduationCap size={18} className="text-primary" />
            <CardTitle>Education</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
           <Input placeholder="University name" {...register("education.university")} />
<Input placeholder="Degree (B.Tech, BCA...)" {...register("education.degree")} />
<Input placeholder="Branch (CSE, IT...)" {...register("education.branch")} />
<Input placeholder="Graduation year (e.g. 2025)" {...register("education.graduationYear")} />
          </CardContent>
        </Card>

        {/* 🔥 EXPERIENCE */}
        <Card className="rounded-2xl border border-[#dbeafe] bg-white shadow-sm">
          <CardHeader className="flex justify-between">
            <div className="flex items-center gap-2">
              <Briefcase size={18} className="text-primary" />
              <CardTitle>Experience</CardTitle>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({
                  companyName: "",
                  jobTitle: "",
                  employmentType: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  currentlyWorking: false,
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </CardHeader>

          <CardContent className="space-y-5">
            {fields.map((field, index) => {
              const currentlyWorking = watch(
                `experiences.${index}.currentlyWorking`
              );

              return (
                <div
                  key={field.id}
                  className="rounded-xl border border-[#e0f2fe] bg-[#f0f9ff] p-5 space-y-4"
                >
                  <div className="grid gap-3 md:grid-cols-2">
                    <Input placeholder="Company (e.g. Google)" {...register(`experiences.${index}.companyName`)} />
                    <Input placeholder="Job title (Frontend Developer)" {...register(`experiences.${index}.jobTitle`)} />
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <Controller
                      control={control}
                      name={`experiences.${index}.employmentType`}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
  
  <SelectTrigger
    className="h-10 rounded-lg border border-[#dbeafe] bg-white px-3 text-sm 
    focus:ring-2 focus:ring-primary/20"
  >
    <SelectValue placeholder="Select employment type" />
  </SelectTrigger>

  <SelectContent className="rounded-xl border border-[#dbeafe] shadow-lg">
    
    <SelectItem
      value="Internship"
      className="cursor-pointer rounded-md hover:bg-[#e0f2fe]"
    >
      Internship
    </SelectItem>

    <SelectItem
      value="Full Time"
      className="cursor-pointer rounded-md hover:bg-[#e0f2fe]"
    >
      Full Time
    </SelectItem>

  </SelectContent>
</Select>
                      )}
                    />

                    <Input placeholder="Location (Remote / City)" {...register(`experiences.${index}.location`)} />
                  </div>

                <div className="grid gap-3 md:grid-cols-2">

  {/* START DATE */}
  <div className="space-y-1">
    <p className="text-xs text-muted-foreground">
      Start Date
    </p>

    <Input
      type="date"
      className="h-10 rounded-lg border border-[#dbeafe] 
      focus:ring-2 focus:ring-primary/20"
      {...register(`experiences.${index}.startDate`)}
    />
  </div>

  {/* END DATE */}
  <div className="space-y-1">
    <p className="text-xs text-muted-foreground">
      End Date
    </p>

    <Input
      type="date"
      disabled={currentlyWorking}
      className={`h-10 rounded-lg border border-[#dbeafe] 
      focus:ring-2 focus:ring-primary/20
      ${
        currentlyWorking
          ? "bg-muted/40 cursor-not-allowed opacity-70"
          : "bg-white"
      }`}
      {...register(`experiences.${index}.endDate`)}
    />

    {currentlyWorking && (
      <p className="text-[11px] text-muted-foreground">
        Disabled because you're currently working here
      </p>
    )}
  </div>

</div>
                  <div className="flex justify-between items-center">
                    <Controller
                      control={control}
                      name={`experiences.${index}.currentlyWorking`}
                      render={({ field }) => (
                        <label className="flex items-center gap-2 text-sm">
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          Currently Working
                        </label>
                      )}
                    />

                    {fields.length > 1 && (
                      <Button type="button" size="icon" onClick={() => remove(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* 🔥 ACTION BAR */}
        <div className="sticky bottom-4 z-20">
          <div className="rounded-2xl border border-[#dbeafe] bg-white/90 backdrop-blur p-4 flex justify-end shadow-lg">
            <Button type="submit" disabled={loading} className="min-w-[180px] bg-primary text-white">
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Saving...
                </>
              ) : (
                "Save Profile"
              )}
            </Button>
          </div>
        </div>

      </form>
    </div>
  );
}