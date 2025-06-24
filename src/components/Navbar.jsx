import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

const NAV_LINKS = [
  { name: "Home", to: "#hero" },
  { name: "Features", to: "#features" },
  { name: "Pricing", to: "#pricing" },
  { name: "FAQ", to: "#faq" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle sticky, backdrop/blur on scroll
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleNavClick = (to) => (e) => {
    if (to.startsWith("#")) {
      e.preventDefault();
      const id = to.substring(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <nav
      className={classNames(
        "fixed top-0 left-0 right-0 z-40 h-16 flex items-center transition-all",
        "px-4 md:px-8",
        scrolled || mobileOpen
          ? "bg-gray-900/70 dark:bg-black/70 backdrop-blur-lg shadow"
          : "bg-transparent"
      )}
      aria-label="Site Navigation"
    >
      {/* Left: Logo */}
      <button
        className="flex items-center gap-2 focus:outline-none"
        onClick={() => navigate("/")}
        aria-label="Home"
        tabIndex={0}
      >
        <img src={logo} alt="Curven logo" className="w-7 h-7" />
        <span className="text-white font-bold text-lg lowercase tracking-wider select-none">curven</span>
      </button>
      {/* Center: Nav links */}
      <div className="hidden md:flex mx-auto gap-8">
        {NAV_LINKS.map((item) => (
          <a
            key={item.name}
            href={item.to}
            onClick={handleNavClick(item.to)}
            className="relative text-white/90 font-medium px-2 py-1 hover:text-white hover:underline underline-offset-4 transition"
          >
            {item.name}
          </a>
        ))}
        <Link
          to="/login"
          className="relative text-white/90 font-medium px-2 py-1 hover:text-white hover:underline underline-offset-4 transition"
          tabIndex={0}
        >
          Login
        </Link>
      </div>
      {/* Right: Get Started Button */}
      <div className="ml-auto hidden md:block">
        <Link
          to="/login"
          className="inline-block rounded-full bg-indigo-600 text-white px-5 py-2 font-semibold shadow hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 transition"
        >
          Get Started
        </Link>
      </div>
      {/* Mobile hamburger */}
      <button
        className="ml-auto md:hidden flex items-center justify-center p-2 text-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
      >
        <span className="sr-only">Toggle navigation</span>
        <svg
          className={classNames("w-7 h-7 transition-transform", mobileOpen ? "rotate-90" : "")}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          viewBox="0 0 24 24"
        >
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>
      {/* Mobile slide-in panel */}
      <div
        className={classNames(
          "fixed inset-0 z-50 transition-all duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "pointer-events-none opacity-0 -translate-x-full"
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          tabIndex={-1}
        />
        <div className="relative w-72 max-w-[90vw] h-full bg-gray-900 dark:bg-black shadow-xl flex flex-col pt-7 px-6 pb-6">
          <div className="flex items-center gap-2 mb-8">
            <img src={logo} alt="Curven logo" className="w-7 h-7" />
            <span className="text-white font-bold text-lg lowercase tracking-wider select-none">curven</span>
          </div>
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.to}
                onClick={(e) => {
                  setMobileOpen(false);
                  handleNavClick(item.to)(e);
                }}
                className="text-white/90 font-medium text-lg py-1 hover:text-white hover:underline underline-offset-4 transition"
              >
                {item.name}
              </a>
            ))}
            <Link
              to="/login"
              className="text-white/90 font-medium text-lg py-1 hover:text-white hover:underline underline-offset-4 transition"
              onClick={() => setMobileOpen(false)}
              tabIndex={0}
            >
              Login
            </Link>
          </nav>
          <Link
            to="/login"
            className="mt-10 inline-block rounded-full bg-indigo-600 text-white px-6 py-2 font-semibold shadow hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 transition"
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </Link>
          <span className="flex-1" />
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}