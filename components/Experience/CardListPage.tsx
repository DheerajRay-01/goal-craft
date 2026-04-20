import React from "react";
import ExperienceCard from "./ExperienceCard";
import PaginationComponent from "../PaginationComponent";
import SortDropdown from "../filters/sortOptions";
import Filter from "../filters/Filter";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// 🔥 shadcn
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

interface Props {
  cards: any[];
  page: number;
  totalPages: number;
  filterOptions: any;
}

const EMPTY_FILTER_OPTIONS = {
  company: [],
  role: [],
  skills: [],
  location: [],
  experienceLevel: [],
  employmentType: [],
  interviewRound: [],
};

const CardListPage = async ({
  cards,
  page,
  totalPages,
  filterOptions,
}: Props) => {
  const session = await getServerSession(authOptions);
  const user = session?.user?._id;

  return (
    <section className="min-h-screen bg-[#f0f9ff]">
      <div className="mx-auto max-w-6xl px-4 py-8">

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

          {/* 🔥 DESKTOP SIDEBAR */}
          <aside className="hidden lg:block sticky top-20 h-fit">
            <div className="rounded-2xl border border-[#dbeafe] bg-white p-5 shadow-soft">
              <Filter filterOptions={filterOptions || EMPTY_FILTER_OPTIONS} />
            </div>
          </aside>

          {/* 🔥 MAIN */}
          <div className="space-y-6">

            {/* 🔥 HEADER */}
            <div className="rounded-2xl border border-[#dbeafe] bg-white px-5 py-4 shadow-soft flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h1 className="text-xl font-semibold">
                  Interview Experiences
                </h1>

                <p className="text-sm text-muted-foreground mt-1">
                  Showing{" "}
                  <span className="font-medium text-primary">
                    {cards.length}
                  </span>{" "}
                  results
                </p>
              </div>

              <SortDropdown basePath="/experiences" />
            </div>

            {/* 🔥 EMPTY STATE */}
            {cards.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-20 border border-[#dbeafe] rounded-2xl bg-white shadow-soft">
                <h3 className="text-lg font-semibold">
                  No results found
                </h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                  Try adjusting filters or search terms.
                </p>
              </div>
            ) : (
              <>
                {/* 🔥 CARDS */}
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cards.map((card: any) => (
                    <ExperienceCard
                      key={card._id}
                      data={card}
                      user={user}
                    />
                  ))}
                </div>

                {/* 🔥 PAGINATION */}
                <div className="flex justify-center pt-6">
                  <PaginationComponent
                    page={page}
                    totalPages={totalPages}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 🔥 MOBILE FLOATING FILTER */}
     <div className="fixed bottom-5 right-5 z-50 lg:hidden">
  <Dialog>
    
    <DialogTrigger asChild>
      <Button className="rounded-full shadow-lg px-4">
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        Filters
      </Button>
    </DialogTrigger>

    <DialogContent className="max-h-[85vh] p-0 overflow-hidden">

      {/* HEADER */}
      <DialogHeader className="p-4 border-b">
        <DialogTitle>Filters</DialogTitle>
      </DialogHeader>

      {/* SCROLLABLE CONTENT */}
      <div className="overflow-y-auto p-4 max-h-[70vh]">
        <Filter filterOptions={filterOptions || EMPTY_FILTER_OPTIONS} />
      </div>

    </DialogContent>

  </Dialog>
</div>
    </section>
  );
};

export default CardListPage;