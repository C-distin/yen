"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavProps {
  title: string;
  link: string;
}

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      <div className="container max-w-screen-2xl mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "circIn" }}
          whileHover={{ scale: 1.05 }}
        >
          <Link href="/" className="flex items-center gap-3 text-2xl font-bold">
            <Image
              src="/logo.png"
              alt="Yendaakye Logo"
              width={40}
              height={40}
            />
            <p className="text-[#5ba3a3]">
              <span className="text-[#daa520]">Yendaakye</span> Job Center
            </p>
          </Link>
        </motion.div>
        {/* Desktop Nav */}
        <motion.nav
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "circIn" }}
          className="hidden md:flex items-center gap-4"
        >
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="text-[#daa520] hover:text-[#5ba3a3] transition-colors duration-200 ease-in-out hover:border-b-2"
            >
              {item.title}
            </Link>
          ))}
        </motion.nav>
        {/* Mobile menu */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "circIn" }}
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <X size={24} className="text-[#daa520]" />
          ) : (
            <Menu size={24} className="text-[#daa520]" />
          )}
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              staggerChildren: 0.1,
              delayChildren: 0.1,
              when: "beforeChildren",
              type: "spring",
            }}
            className="overflow-hidden md:hidden bg-[#5ba3a3]/20 backdrop-blur-sm border-b border-[#daa520]"
          >
            <div className="mx-auto container px-4 py-4">
              <nav className="flex flex-col gap-4 items-center">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.link}
                    className="text-[#daa520] text-lg font-bold py-2"
                    onClick={toggleMenu}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
