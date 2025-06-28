import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";

interface SocialLinkProps {
  icon: LucideIcon;
  link: string;
  label: string;
}

interface MenuLinkProps {
  title: string;
  link: string;
}

interface ContactInfoProps {
  icon: LucideIcon;
  text: string;
  link?: string;
}

export function Footer() {
  const socialLinks: SocialLinkProps[] = [
    {
      icon: Facebook,
      link: "https://www.facebook.com/yendaakyejobcenter",
      label: "Follow us on Facebook",
    },
    {
      icon: Instagram,
      link: "https://www.instagram.com/yendaakyejobcenter",
      label: "Follow us on Instagram",
    },
    {
      icon: Twitter,
      link: "https://twitter.com/yendaakyejobcenter",
      label: "Follow us on Twitter",
    },
  ];

  const menuLinks: MenuLinkProps[] = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Jobs", link: "/jobs" },
    { title: "Contact", link: "/contact" },
  ];

  const legalLinks: MenuLinkProps[] = [
    { title: "Privacy Policy", link: "/privacy" },
    { title: "Terms of Service", link: "/terms" },
    { title: "Cookie Policy", link: "/cookies" },
  ];

  const contactInfo: ContactInfoProps[] = [
    {
      icon: Mail,
      text: "yendaakyejobscenter@proton.me",
      link: "mailto:yendaakyejobscenter@proton.me",
    },
    {
      icon: Phone,
      text: "+233 50 333 6534",
      link: "tel:+233503336534",
    },
    {
      icon: MapPin,
      text: "Accra, Ghana",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="Yendaakye Logo"
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  <span className="text-white">Yendaakye</span>{" "}
                  <span className="text-amber-400">Job Center</span>
                </h2>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed max-w-md">
              Connecting talented individuals with exceptional opportunities.
              We're passionate about empowering careers and building bridges
              between job seekers and their dream positions.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.link}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/50 transition-all duration-300 hover:bg-amber-400 hover:scale-110"
                >
                  <social.icon
                    size={18}
                    className="text-slate-400 group-hover:text-slate-900 transition-colors"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              {menuLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.link}
                  className="text-slate-300 hover:text-amber-400 transition-colors duration-200 hover:translate-x-1 transform"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
            <div className="space-y-4">
              {contactInfo.map((contact) => (
                <div key={contact.text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/50">
                    <contact.icon size={14} className="text-amber-400" />
                  </div>
                  {contact.link ? (
                    <Link
                      href={contact.link}
                      className="text-slate-300 hover:text-amber-400 transition-colors duration-200 text-sm"
                    >
                      {contact.text}
                    </Link>
                  ) : (
                    <span className="text-slate-300 text-sm">
                      {contact.text}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700/50 bg-slate-900/50">
        <div className="container mx-auto max-w-7xl px-4 py-6 md:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Yendaakye Job Center. All rights
              reserved.
            </p>

            <nav className="flex flex-wrap items-center gap-6">
              {legalLinks.map((link, index) => (
                <div key={link.title} className="flex items-center gap-6">
                  <Link
                    href={link.link}
                    className="text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-slate-600">•</span>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
