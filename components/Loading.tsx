import { Skeleton } from "@/components/ui/skeleton";

export default function CardLoading({
  count = 6,
}: {
  count?: number;
}) {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-gray-200 p-4 bg-white shadow-sm space-y-4"
        >
          {/* title */}
          <Skeleton className="h-5 w-32" />

          {/* role */}
          <Skeleton className="h-4 w-20" />

          {/* description */}
          <Skeleton className="h-14 w-full" />

          {/* footer */}
          <div className="flex justify-between">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}

    </div>
  );
}