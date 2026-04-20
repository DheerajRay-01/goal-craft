"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SlidersHorizontal } from "lucide-react";

type FilterOptions = {
  company: string[];
  role: string[];
  skills: string[];
  location: string[];
  experienceLevel: string[];
  employmentType: string[];
  interviewRound: string[];
};

const Filter = ({ filterOptions }: { filterOptions: FilterOptions }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (
    filterKey: string,
    value: string,
    checked: boolean
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    const existingValues = params.get(filterKey)?.split(",") || [];

    let updatedValues: string[];

    if (checked) {
      updatedValues = [...new Set([...existingValues, value])];
    } else {
      updatedValues = existingValues.filter((v) => v !== value);
    }

    if (updatedValues.length > 0) {
      params.set(filterKey, updatedValues.join(","));
    } else {
      params.delete(filterKey);
    }

    params.set("page", "1");
    router.replace(`/experiences?${params.toString()}`);
  };

  const clearFilters = () => {
    router.replace("/experiences");
  };

  const isChecked = (filterKey: string, value: string) => {
    const selectedValues = searchParams.get(filterKey)?.split(",") || [];
    return selectedValues.includes(value);
  };

  return (
    <aside className="sticky top-20 w-full space-y-5 rounded-2xl border border-[#dbeafe] bg-white p-5 shadow-soft">

      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-[#e0f2fe]">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-sm font-semibold">Filters</h2>
        </div>

        <button
          onClick={clearFilters}
          className="text-[11px] text-muted-foreground hover:text-primary transition"
        >
          Reset
        </button>
      </div>

      {/* 🔥 ACCORDION */}
      <Accordion type="multiple" className="space-y-2">
        {Object.entries(filterOptions).map(([key, options]) => (
          <AccordionItem
            key={key}
            value={key}
            className="border border-[#dbeafe] rounded-xl overflow-hidden bg-[#f0f9ff]"
          >
            <AccordionTrigger className="px-3 py-2 text-sm font-medium capitalize hover:no-underline">

              <div className="flex items-center justify-between w-full">
                <span className="text-foreground">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>

                {searchParams.get(key) && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {searchParams.get(key)?.split(",").length}
                  </span>
                )}
              </div>

            </AccordionTrigger>

            <AccordionContent className="px-3 pb-3">
              <div className="max-h-44 overflow-y-auto space-y-1 pr-1">

                {options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer transition hover:bg-[#e0f2fe]"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked(key, option)}
                      onChange={(e) =>
                        handleFilterChange(
                          key,
                          option,
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 accent-[var(--primary)]"
                    />

                    <span className="text-muted-foreground text-[13px]">
                      {option}
                    </span>
                  </label>
                ))}

              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

    </aside>
  );
};

export default Filter;