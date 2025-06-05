import { About } from "./about";

export const metadata = {
  title: "About Us | YenDaakye - Connecting Talent with Opportunity",
  description:
    "Learn about YenDaakye's mission to connect exceptional talent with visionary companies across Ghana and West Africa. Discover our values, team, and story.",
  keywords:
    "about yendaakye, recruitment agency ghana, talent solutions, our story, company values, leadership team",
};

export default function Page() {
  return (
    <main>
      <About />
    </main>
  );
}
