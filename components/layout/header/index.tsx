"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavProps {
  title: string;
  link: string;
}

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems: NavProps[] = [
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

  const isActiveLink = (link: string) => {
    if (link === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(link);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/20 shadow-lg"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between py-4 px-4 md:px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="Yendaakye Logo"
                width={44}
                height={44}
                className="rounded-xl transition-transform duration-300 group-hover:rotate-3"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                  Yendaakye
                </span>{" "}
                <span className="bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                  Job Center
                </span>
              </h1>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:flex items-center gap-1"
        >
          {navItems.map((item, index) => (
            <Link
              key={item.title}
              href={item.link}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-slate-100/80",
                isActiveLink(item.link)
                  ? "text-teal-600 bg-teal-50/80"
                  : "text-slate-700 hover:text-teal-600",
              )}
            >
              {item.title}

              {/* Active indicator */}
              {isActiveLink(item.link) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-amber-500/10 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </motion.nav>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:flex items-center gap-4"
        >
          <Link
            href="/jobs"
            className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full font-medium text-sm hover:from-teal-700 hover:to-teal-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25"
          >
            Find Jobs
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100/80 transition-colors"
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/20"
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.link}
                      onClick={toggleMenu}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                        isActiveLink(item.link)
                          ? "text-teal-600 bg-teal-50/80"
                          : "text-slate-700 hover:text-teal-600 hover:bg-slate-100/80",
                      )}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4 mt-4 border-t border-slate-200/20"
                >
                  <Link
                    href="/jobs"
                    onClick={toggleMenu}
                    className="block text-center px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-medium hover:from-teal-700 hover:to-teal-800 transition-all duration-300"
                  >
                    Find Jobs
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
