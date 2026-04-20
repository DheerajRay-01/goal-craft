import ExperienceCard from "./ExperienceCard";
import PaginationComponent from "../PaginationComponent";
import SortDropdown from "../filters/sortOptions";
import Filter from "../filters/Filter";

interface Props {
  cards: any[];
  page: number;
  totalPages: number;
  filterOptions?: any;
  showFilters?: boolean;
  title?: string;
  subtitle?: string;
  user?: string;
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

const ExperienceList = ({
  cards,
  page,
  totalPages,
  filterOptions,
  showFilters = false,
  title = "Experiences",
  subtitle,
  user,
}: Props) => {
  return (
    <section className="min-h-screen bg-[#f0f9ff]">
      <div className="mx-auto max-w-6xl px-4 py-8">

        <div className={`grid gap-8 ${showFilters ? "lg:grid-cols-[260px_1fr]" : ""}`}>

          {/* SIDEBAR */}
          {showFilters && (
            <aside className="hidden lg:block sticky top-20 h-fit">
              <div className="rounded-2xl border border-[#dbeafe] bg-white p-5 shadow-soft">
                <Filter filterOptions={filterOptions || EMPTY_FILTER_OPTIONS} />
              </div>
            </aside>
          )}

          {/* MAIN */}
          <div className="space-y-6">

            {/* HEADER */}
            <div className="rounded-2xl border border-[#dbeafe] bg-white px-5 py-4 shadow-soft flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h1 className="text-xl font-semibold">
                  {title}
                </h1>

                <p className="text-sm text-muted-foreground mt-1">
                  {subtitle || `${cards.length} results`}
                </p>
              </div>

              {/* <SortDropdown basePath="/me/posts" /> */}
            </div>

            {/* MOBILE FILTER */}
            {showFilters && (
              <div className="lg:hidden">
                <div className="rounded-xl border border-[#dbeafe] p-4 bg-white shadow-soft">
                  <Filter filterOptions={filterOptions || EMPTY_FILTER_OPTIONS} />
                </div>
              </div>
            )}

            {/* EMPTY */}
            {cards.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-20 border border-[#dbeafe] rounded-2xl bg-white shadow-soft">
                <h3 className="text-lg font-semibold">
                  No results found
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Nothing to show here yet
                </p>
              </div>
            ) : (
              <>
                {/* CARDS */}
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cards.map((card: any) => (
                    <ExperienceCard
                      key={card._id}
                      data={card}
                      user={user}
                    />
                  ))}
                </div>

                {/* PAGINATION */}
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
    </section>
  );
};

export default ExperienceList;