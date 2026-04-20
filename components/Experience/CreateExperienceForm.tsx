"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormValues = {
  slug?: string;
  companyName: string;
  role: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  interviewDate: string;
  skills: { value: string }[];
  rounds: { title: string; description: string }[];
  overallExperience: string;
  questions: { value: string }[];
  resources: Resource[];
};

type Resource = {
  url: string;
  fileName: string;
  fileType: string;
};

export default function CreateExperienceForm({
  data,
  edit = false,
}: {
  data?: FormValues;
  edit?: boolean;
}) {
  const form = useForm<FormValues>({
    defaultValues: data || {
      companyName: "",
      role: "",
      location: "",
      employmentType: "Internship",
      experienceLevel: "Student",
      interviewDate: "",
      skills: [{ value: "" }],
      rounds: [{ title: "", description: "" }],
      overallExperience: "",
      questions: [{ value: "" }],
      resources: [],
    },
  });

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { isSubmitting },
  } = form;

  const roundsField = useFieldArray({ control, name: "rounds" });
  const questionField = useFieldArray({ control, name: "questions" });
  const skillsField = useFieldArray({ control, name: "skills" });

  const [isUploading, setIsUploading] = useState(false);

  async function submitExperience(
    values: FormValues,
    status: "draft" | "published",
  ) {
    try {
      const endpoint = edit
        ? `/api/experience/${data?.slug}`
        : `/api/experience`;

      const method = edit ? "PATCH" : "POST";

      console.log("values", values);

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, status }),
      });

      const resData = await res.json();

      if (!res.ok || !resData.success) {
        throw new Error(resData.message || "Request failed");
      }

      toast.success(
        status === "draft" ? "Draft saved successfully" : resData.message,
      );

      reset();

      router.push(`/experiences/${resData.data.slug}`);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  }

  function onSubmit(values: FormValues) {
    submitExperience(values, "published");
  }

  function saveDraft() {
    submitExperience(getValues(), "draft");
  }
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;

    setIsUploading(true);

    try {
      const uploadedResources: Resource[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/uploads", {
          // ✅ endpoint fix
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Upload failed");
        }

        uploadedResources.push({
          url: data.url, // ✅ FIX HERE
          fileName: file.name,
          fileType: file.type,
        });

        console.log(data);
      }

      const currentResources = form.getValues("resources") || [];

      form.setValue("resources", [...currentResources, ...uploadedResources]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload file");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  }
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            Share Interview Experience
          </h1>
          <p className="text-base text-muted-foreground">
            Help others prepare by sharing your real interview journey.
          </p>
        </div>

        {/* Company + Job Info */}
        <Card className="rounded-3xl border shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Basic Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Input
              className="h-11 rounded-xl"
              placeholder="Company Name"
              {...register("companyName", { required: true })}
            />

            <Input
              className="h-11 rounded-xl"
              placeholder="Role"
              {...register("role", { required: true })}
            />

            <Input
              className="h-11 rounded-xl"
              placeholder="Location"
              {...register("location")}
            />

            <Controller
              control={control}
              name="employmentType"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Employment Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Full Time">Full Time</SelectItem>
                    <SelectItem value="Part Time">Part Time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <Controller
              control={control}
              name="experienceLevel"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Experience Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Fresher">Fresher</SelectItem>
                    <SelectItem value="1-2 Years">1-2 Years</SelectItem>
                    <SelectItem value="2+ Years">2+ Years</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <Input
              className="h-11 rounded-xl"
              type="date"
              {...register("interviewDate")}
            />
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="rounded-3xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Skills / Topics</CardTitle>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => skillsField.append({ value: "" })}
            >
              <Plus size={16} className="mr-2" />
              Add Skill
            </Button>
          </CardHeader>

          <CardContent className="space-y-3">
            {skillsField.fields.map((field, index) => (
              <div key={field.id} className="flex gap-3">
                <Input
                  className="h-11 rounded-xl"
                  placeholder="DSA, React, System Design..."
                  {...register(`skills.${index}.value`)}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => skillsField.remove(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Interview Process */}
        <Card className="rounded-3xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Interview Process</CardTitle>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                roundsField.append({
                  title: "",
                  description: "",
                })
              }
            >
              <Plus size={16} className="mr-2" />
              Add Round
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {roundsField.fields.map((field, index) => (
              <div
                key={field.id}
                className="rounded-2xl border bg-muted/30 p-5 space-y-4"
              >
                <Input
                  className="h-11 rounded-xl"
                  placeholder="Round Title"
                  {...register(`rounds.${index}.title`)}
                />

                <Textarea
                  className="min-h-[120px] rounded-2xl"
                  placeholder="Describe this round..."
                  {...register(`rounds.${index}.description`)}
                />

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => roundsField.remove(index)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Overall Experience */}
        <Card className="rounded-3xl border shadow-sm">
          <CardHeader>
            <CardTitle>Overall Experience</CardTitle>
          </CardHeader>

          <CardContent>
            <Textarea
              className="min-h-[180px] rounded-2xl"
              placeholder="Describe your full interview experience..."
              {...register("overallExperience", { required: true })}
            />
          </CardContent>
        </Card>

        {/* Questions */}
        <Card className="rounded-3xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Interview Questions</CardTitle>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => questionField.append({ value: "" })}
            >
              <Plus size={16} className="mr-2" />
              Add Question
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {questionField.fields.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-3 rounded-2xl border bg-muted/30 p-4"
              >
                <span className="mt-2 text-sm font-semibold">Q{index + 1}</span>

                <Textarea
                  className="flex-1 rounded-2xl"
                  placeholder="Describe the interview question..."
                  {...register(`questions.${index}.value`)}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => questionField.remove(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className="rounded-3xl border shadow-sm">
          <CardHeader>
            <CardTitle>Resources</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="rounded-2xl border-2 border-dashed p-8 text-center space-y-4">
              <Upload className="mx-auto text-muted-foreground" size={24} />

              <p className="text-sm">Upload interview resources</p>

              <input
                type="file"
                multiple
                accept=".pdf,image/*"
                className="hidden"
                id="fileUpload"
                onChange={handleFileUpload}
              />

              <label htmlFor="fileUpload">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isUploading}
                  asChild
                >
                  <span>{isUploading ? "Uploading..." : "Upload File"}</span>
                </Button>
              </label>

              <p className="text-xs text-muted-foreground">PDF, Docs, Images</p>
            </div>
            <div className="space-y-2 mt-4">
              {form.watch("resources")?.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border px-4 py-2"
                >
                  <span className="text-sm truncate">{file.fileName}</span>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const current = form.getValues("resources");

                      form.setValue(
                        "resources",
                        current.filter((_, i) => i !== index),
                      );
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="sticky bottom-4 flex justify-end gap-3 rounded-2xl border bg-card/90 p-4 backdrop-blur">
          <Button type="button" variant="outline" onClick={saveDraft}>
            Save Draft
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {edit
              ? isSubmitting
                ? "Saving changes..."
                : "Save & Publish"
              : isSubmitting
                ? "Publishing..."
                : "Publish Experience"}
          </Button>
        </div>
      </form>
    </div>
  );
}
