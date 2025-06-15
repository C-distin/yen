import { notFound } from "next/navigation";
import { getJobById } from "../actions";
import { JobDetail } from "./job-detail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const jobId = parseInt(slug);
  
  if (isNaN(jobId)) {
    return {
      title: "Job Not Found | YenDaakye",
    };
  }

  const job = await getJobById(jobId);

  if (!job) {
    return {
      title: "Job Not Found | YenDaakye",
    };
  }

  return {
    title: `${job.title} at ${job.company.name} | YenDaakye`,
    description: job.description.substring(0, 160) + "...",
    keywords: `${job.title}, ${job.company.name}, ${job.category}, ${job.type}, jobs ghana, careers`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const jobId = parseInt(slug);

  if (isNaN(jobId)) {
    notFound();
  }

  const job = await getJobById(jobId);

  if (!job) {
    notFound();
  }

  return (
    <main>
      <JobDetail job={job} />
    </main>
  );
}