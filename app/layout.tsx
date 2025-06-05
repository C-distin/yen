import type { Metadata } from "next";
import { geist } from "@/components/fonts";
import { Header } from "@/components/layout/header";
import "./globals.css";
import { Footer } from "@/components/layout/footer";

const title = "Yendaakye Job Center";
const description = "A job center that puts the job seeker first.";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: "https://yendaakye.com",
    siteName: "Yendaakye Job Center",
    writers: ["@trickyitsolutions"],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    creator: "@ataa_nkpa1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
