import { useState, useEffect } from "react";
import { Menu, X, Globe, Moon, Sun, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.howItWorks"), href: "#how-it-works" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const toggleLang = () => setLang(lang === "en" ? "ar" : "en");

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#home" className="flex items-center gap-2 text-2xl font-bold text-gradient">
          <img src="/sourah-logo.svg" alt="Sourah" className="w-8 h-8" />
          {lang === "ar" ? "صورة" : "Sourah"}
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md"
          >
            <Globe size={16} />
            <span>{lang === "en" ? "عربي" : "EN"}</span>
          </button>
          <button
            onClick={toggleDark}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md"
            title={t("darkMode.toggle")}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link to="/auth">
            <Button variant="ghost" size="sm">{t("nav.login")}</Button>
          </Link>
          <a href="https://linkedin.com/company/sourah-sa" target="_blank" rel="noopener noreferrer">
            <Button size="sm">{t("nav.visitLinkedin")}</Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleDark}
            className="text-muted-foreground hover:text-foreground p-1"
            title={t("darkMode.toggle")}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={toggleLang}
            className="text-muted-foreground hover:text-foreground p-1"
          >
            <Globe size={20} />
          </button>
          <button className="text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a href="https://linkedin.com/company/sourah-sa" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button size="sm" className="w-full">{t("nav.visitLinkedin")}</Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
