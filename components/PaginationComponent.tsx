'use client'

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useSearchParams } from "next/navigation";

interface Props {
  page: number;
  totalPages: number;
}

const PaginationComponent = ({ page, totalPages }: Props) => {
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "newest";

  const options = `sort=${currentSort}`;

  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (page > 3) pages.push("...");

    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pages.push(i);
    }

    if (page < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pages = generatePages();

  return (
    <Pagination className="mt-8">
      <PaginationContent className="gap-1.5">

        {/* 🔥 PREVIOUS */}
        <PaginationItem>
          <PaginationPrevious
            href={page > 1 ? `?page=${page - 1}&${options}` : "#"}
            className="h-8 px-3 rounded-lg border border-[#dbeafe] bg-white text-muted-foreground hover:bg-[#f0f9ff] transition"
          />
        </PaginationItem>

        {/* 🔥 PAGE NUMBERS */}
        {pages.map((p, i) =>
          p === "..." ? (
            <PaginationItem key={i}>
              <PaginationEllipsis className="text-muted-foreground text-xs" />
            </PaginationItem>
          ) : (
            <PaginationItem key={i}>
              <PaginationLink
                href={`?page=${p}&${options}`}
                isActive={page === p}
                className={`h-8 min-w-8 px-3 rounded-lg text-sm font-medium transition
                  ${
                    page === p
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white border border-[#dbeafe] text-muted-foreground hover:bg-[#e0f2fe]"
                  }
                `}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* 🔥 NEXT */}
        <PaginationItem>
          <PaginationNext
            href={page < totalPages ? `?page=${page + 1}&${options}` : "#"}
            className="h-8 px-3 rounded-lg border border-[#dbeafe] bg-white text-muted-foreground hover:bg-[#f0f9ff] transition"
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;