import { getAnalytics } from "./dashboard/actions";
import { getFeaturedJobs } from "./dashboard/actions";
import { Home } from "./home";

export const metadata = {
  title: "YenDaakye Job Center - Connecting Talent with Opportunity",
  description:
    "Find your dream job in Ghana and West Africa. Connect with top employers and discover career opportunities that match your skills and ambitions.",
  keywords:
    "jobs ghana, careers west africa, employment opportunities, job search, recruitment, yendaakye",
};

export default async function Page() {
  const [featuredJobs, analytics] = await Promise.all([
    getFeaturedJobs(),
    getAnalytics(),
  ]);

  return (
    <main>
      <Home featuredJobs={featuredJobs} stats={analytics} />
    </main>
  );
}
