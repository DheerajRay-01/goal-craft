import CardListPage from "@/components/Experience/CardListPage";


interface AllExperienceProps {
  searchParams: {
    page?: string;
    sort?: string;
    company?: string;
    role?: string;
    skills?: string;
    location?: string;
    experienceLevel?: string;
    employmentType?: string;
    interviewRound?: string;
    user?:any;  
  };
}

const limit = 9;

export default async function AllExperience({
  searchParams,
}: AllExperienceProps) {
  const param = await searchParams
  const page = Number(param.page) || 1;
  const sort = param.sort || "newest";

  const {
    company,
    role,
    skills,
    location,
    experienceLevel,
    employmentType,
    interviewRound,
  } = param;

  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("limit", String(limit));
  params.set("sort", sort);

  if (company) params.set("company", company);
  if (role) params.set("role", role);
  if (skills) params.set("skills", skills);
  if (location) params.set("location", location);
  if (experienceLevel) params.set("experienceLevel", experienceLevel);
  if (employmentType) params.set("employmentType", employmentType);
  if (interviewRound) params.set("interviewRound", interviewRound);

 const [experienceRes, filterRes] = await Promise.all([
  fetch(`${process.env.BASE_URL}/api/experience?${params.toString()}`, {
    cache: "no-store",
  }),
 fetch(`${process.env.BASE_URL}/api/getFilterOptions`, {
  next: { revalidate: 60 }, // refresh every 60 sec
})
]);



const experienceData = await experienceRes.json();
const filterData = await filterRes.json();

console.log(experienceData);


  return (
  <CardListPage
  cards={experienceData?.data?.experiences || []}
  totalPages={experienceData?.data?.pagination?.totalPages || 1}
  page={page}
  filterOptions={filterData?.data}

/>
  );
}