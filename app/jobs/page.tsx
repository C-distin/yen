import { Jobs } from "./jobs";
import { getJobs } from "../dashboard/actions";

export const metadata = {
  title: "Jobs | YenDaakye - Find Your Dream Career",
  description:
    "Browse thousands of job opportunities across Ghana and West Africa. Find your perfect career match with top companies and employers.",
  keywords:
    "jobs ghana, careers west africa, employment opportunities, job search, yendaakye jobs",
};

export default async function Page() {
  const jobs = await getJobs();

  return (
    <main>
      <Jobs initialJobs={jobs} />
    </main>
  );
}