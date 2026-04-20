"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const DeleteAndEditBtn = ({ slug }: { slug: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const res = await fetch(`/api/experience/${slug}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast.success("Post deleted successfully");

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">

      {/* Edit */}
      {/* <Button
        size="sm"
        variant="outline"
        onClick={() => router.push(`/experience/${slug}/edit`)}
        className="h-10 rounded-xl px-4 font-medium shadow-sm"
      >
        <Pencil size={14} className="mr-2" />
        Edit
      </Button> */}

      {/* Delete */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="h-10 rounded-xl border-destructive/20 px-4 text-destructive hover:bg-destructive/5 hover:text-destructive"
          >
            <Trash2 size={14} className="mr-2" />
            Delete
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">
              Delete this post?
            </AlertDialogTitle>

            <AlertDialogDescription className="leading-6">
              This action cannot be undone. Your interview experience
              will be permanently removed from GoalCraft.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-xl bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? <Spinner scale={4} /> : "Delete Post"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteAndEditBtn;