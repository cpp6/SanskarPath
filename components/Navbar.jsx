"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { SanskarLogo } from "./SanskarIcons";
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  LayoutDashboard, 
  LogOut,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar({ transparent = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, logout, initialize } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    initialize();
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Values", href: "#features" },
    { name: "Learning Path", href: "#age-groups" },
  ];

  const dashboardPath = user?.role === "admin" 
    ? "/dashboard/admin" 
    : user?.role === "child" 
    ? "/dashboard/child" 
    : "/dashboard/parent";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-sandalwood-100 dark:border-neutral-800 py-3"
          : transparent
          ? "bg-transparent py-6"
          : "bg-white dark:bg-neutral-900 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <SanskarLogo className="w-10 h-10 group-hover:rotate-6 transition-transform" />
          <div className="flex flex-col">
            <span className={`font-display font-bold text-xl tracking-tight transition-colors ${
              transparent && !scrolled ? "text-neutral-900 dark:text-white" : "text-neutral-900 dark:text-white"
            }`}>
              Sanskar Digital
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-saffron-600 leading-none">Verified Wisdom</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-neutral-500 hover:text-saffron-600 dark:text-neutral-400 dark:hover:text-saffron-400 transition-colors tracking-wide uppercase"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-6 w-px bg-sandalwood-100 dark:bg-neutral-800" />
          
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-xl bg-sandalwood-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-saffron-500 transition-colors"
          >
            {!mounted ? <Moon className="w-5 h-5 opacity-0" /> : theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href={dashboardPath}
                className="btn-primary !py-2.5 !px-5 text-xs flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" /> My Dashboard
              </Link>
              <button 
                onClick={logout}
                className="p-2.5 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-bold text-xs"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link
                href="/login"
                className="text-sm font-bold text-neutral-900 dark:text-white hover:text-saffron-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="btn-primary !py-3 !px-8 text-sm shadow-lg shadow-saffron-200 dark:shadow-neutral-950/50"
              >
                Join Now
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-neutral-600 dark:text-neutral-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-neutral-900 border-b border-sandalwood-100 dark:border-neutral-800 py-8 px-6 space-y-6 shadow-2xl animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-xl font-display font-bold text-neutral-900 dark:text-white"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t border-sandalwood-50 dark:border-neutral-800 space-y-4">
            {user ? (
              <Link
                href={dashboardPath}
                className="btn-primary w-full text-center"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block w-full py-4 text-center font-bold text-neutral-900 dark:text-white bg-sandalwood-50 dark:bg-neutral-800 rounded-2xl"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="btn-primary w-full text-center block"
                  onClick={() => setIsOpen(false)}
                >
                  Join Community
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
