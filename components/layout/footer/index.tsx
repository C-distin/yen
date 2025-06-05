import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, type LucideIcon } from "lucide-react";

interface SocialLinkProps {
  icon: LucideIcon;
  link: string;
}

interface MenuLinkProps {
  title: string;
  link: string;
}

export function Footer() {
  const socialLinks: SocialLinkProps[] = [
    {
      icon: Facebook,
      link: "https://www.facebook.com/yendaakyejobcenter",
    },
    {
      icon: Instagram,
      link: "https://www.instagram.com/yendaakyejobcenter",
    },
    {
      icon: Twitter,
      link: "https://twitter.com/yendaakyejobcenter",
    },
  ];

  const menuLinks: MenuLinkProps[] = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Jobs",
      link: "/jobs",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];

  return (
    <footer className="py-12 bg-[#5ba3a3] text-gray-300">
      <div className="container max-w-screen-2xl mx-auto gap-8 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Information */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Image
                  src="/logo.png"
                  alt="Yendaakye Logo"
                  width={40}
                  height={40}
                />
                <p className="text-[#daa520] text-2xl font-bold">
                  <span className="text-gray-400">Yendaakye</span> Job Center
                </p>
              </div>
              <p className="text-gray-200 text-sm">
                We are a team of people who are passionate about the getting
                opportunities for people who are looking for jobs.
              </p>
            </div>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.link}
                  href={link.link}
                  className="text-gray-200 hover:text-[#daa520]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon size={24} />
                </Link>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-gray-100">Menu</h3>
            <div className="flex flex-col gap-4">
              {menuLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.link}
                  className="text-gray-200 hover:text-[#daa520]"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
