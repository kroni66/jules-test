import React from "react";
import Navbar from "../components/Navbar";
import codePreview from "../assets/code-preview.png";
import heroCube from "../assets/hero-cube.png";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";

// --- Placeholder assets helpers ---
const PlaceholderImg = ({ text = "Image", className = "" }) => (
  <div className={`flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-400 to-yellow-300 text-white font-bold text-xl rounded-xl ${className}`}>
    <span className="opacity-80">{text}</span>
  </div>
);

// --- Internal reusable components ---

function FeatureBlock({ title, description, img, reverse }) {
  return (
    <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 py-14 px-6 md:px-10">
      <div className={`flex-1 ${reverse ? "md:order-2" : ""} flex justify-center`}>
        <div className="rounded-3xl shadow-xl bg-gradient-to-br from-purple-500 via-pink-500 via-40% to-yellow-400 p-1 w-[340px] h-[240px] md:w-[420px] md:h-[280px] flex items-center justify-center">
          {img}
        </div>
      </div>
      <div className={`flex-1 ${reverse ? "md:order-1" : ""} text-center md:text-left`}>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-200 text-lg">{description}</p>
      </div>
    </section>
  );
}

function FeatureCard({ title, text, icon }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow flex flex-col items-start gap-3 px-6 py-6 min-w-[220px] max-w-sm border border-gray-100 dark:border-gray-800">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-400 to-yellow-300">
        {icon}
      </div>
      <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{title}</h4>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{text}</p>
    </div>
  );
}

function GradientCubeImg({ className }) {
  // Use heroCube if present, else use placeholder
  return (
    <img
      src={heroCube}
      alt="Gradient cube"
      className={`w-full max-w-xs md:max-w-md rounded-2xl shadow-xl ${className || ""}`}
      style={{ aspectRatio: "1/1" }}
      loading="lazy"
    />
  );
}

// --- Testimonial Data ---
const TESTIMONIALS = [
  {
    name: "Alice Lee",
    role: "Software Engineer, NewTech",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "Curven transformed our workflow. The code suggestions are eerily accurate and the natural language edits are game-changing.",
  },
  {
    name: "Diego Vasquez",
    role: "CTO, CodeForge",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Never thought an editor would truly understand my codebase. Curven just gets it.",
  },
  {
    name: "Priya Nair",
    role: "Lead Frontend Dev",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "The onboarding was seamless and the feature set is just perfect for our remote team.",
  },
  {
    name: "Marcus Braun",
    role: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    quote: "The speed boost for our engineers is remarkable. Curven helps us ship faster.",
  },
  {
    name: "Jin Park",
    role: "AI Researcher",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
    quote: "A must-have for any AI developer. The code analysis is top notch.",
  },
  {
    name: "Fatima Zahra",
    role: "Full Stack Dev",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    quote: "I love the vibrant UI and how intuitive it is. Curven sets a new standard.",
  },
  {
    name: "Tomás Costa",
    role: "DevOps Engineer",
    avatar: "https://randomuser.me/api/portraits/men/25.jpg",
    quote: "The editor handles massive codebases without breaking a sweat. Impressive!",
  },
  {
    name: "Sophie Lemaire",
    role: "QA Lead",
    avatar: "https://randomuser.me/api/portraits/women/31.jpg",
    quote: "Integrating Curven was the best decision. Our workflow is now super smooth.",
  },
  {
    name: "Zachary Mills",
    role: "Backend Architect",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    quote: "The code navigation and refactor features save me hours every week.",
  },
  {
    name: "Hiro Tanaka",
    role: "Tech Lead",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    quote: "Curven always keeps up, even with our complex monorepos. Highly recommended.",
  },
  {
    name: "Nia Carter",
    role: "UI Designer",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    quote: "The design is beautiful and accessibility is built-in. Love using it daily.",
  },
  {
    name: "Felix Müller",
    role: "Student Developer",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    quote: "Curven makes coding fun again. The AI suggestions are like magic.",
  },
];

// --- Main Landing Page ---
export default function LandingPage() {
  const navigate = useNavigate();

  // Trusted by array: (just text placeholders for style)
  const trustedBy = [
    "Acme Corp",
    "Globex",
    "Initech",
    "Umbrella",
    "Hooli",
    "WayneTech",
    "Stark Industries",
    "Wonka",
    "Cyberdyne",
  ];

  return (
    <div className="bg-white dark:bg-[#101013] min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section id="hero" className="relative pt-24 pb-8 px-2 sm:px-0">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl shadow-2xl bg-gradient-to-br from-purple-500 via-pink-500 via-40% to-yellow-400 p-2 md:p-4 min-h-[450px] flex flex-col items-center justify-center overflow-visible" style={{ boxShadow: "0 8px 40px 0 rgba(100,0,100,.10)" }}>
            <div className="w-full px-4 md:px-12 pt-12 pb-8 flex flex-col items-center">
              <h1 className="text-white font-bold text-4xl sm:text-6xl tracking-tight text-center drop-shadow-lg">The AI Code Editor</h1>
              <p className="mt-5 mb-8 text-white/90 text-lg sm:text-2xl text-center max-w-2xl">Supercharge your workflow with an editor that understands your codebase. Make changes in plain English, generate code, and build software faster.</p>
              <div className="flex gap-4 flex-wrap mb-10">
                <button
                  onClick={() => navigate("/login")}
                  className="rounded-full font-semibold px-7 py-3 text-indigo-700 bg-white border-2 border-white shadow hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition"
                >
                  Get started
                </button>
                <a
                  href="#features"
                  className="rounded-full font-semibold px-7 py-3 border-2 border-white text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition"
                >
                  Learn more
                </a>
              </div>
            </div>
            {/* Code preview image, overflows out of card for depth */}
            <div className="relative w-full flex justify-center -mb-12">
              <div className="relative z-10 rounded-2xl bg-gray-900 shadow-2xl overflow-hidden w-[94vw] max-w-3xl border-4 border-white/10" style={{ marginTop: "-30px" }}>
                <img
                  src={codePreview}
                  alt="Code editor preview"
                  className="w-full h-60 sm:h-80 object-cover"
                  loading="lazy"
                  style={{ objectFit: "cover", background: "#252344" }}
                  onError={e => { e.target.style.background = "#4c51bf"; }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Trusted by logos */}
      <section id="trusted" className="max-w-5xl mx-auto mt-16 mb-10 px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-75 grayscale">
          {trustedBy.map((t, i) => (
            <span key={t} className="text-lg font-semibold tracking-wide text-gray-800 dark:text-gray-200 px-2 py-1">{t}</span>
          ))}
        </div>
      </section>
      {/* Features */}
      <section id="features" className="pt-10">
        <FeatureBlock
          title="Tab, tab, tab"
          description="Navigate, edit, and manage your code with blazing fast multi-tab support. Stay in flow."
          img={
            <PlaceholderImg text="Tabs UI" className="w-full h-full" />
          }
        />
        <FeatureBlock
          title="Knows your codebase"
          description="Curven deeply analyzes your repository so you can refactor, jump to symbol, and get instant context-aware suggestions."
          img={
            <PlaceholderImg text="Code intelligence" className="w-full h-full" />
          }
          reverse
        />
        <FeatureBlock
          title="Edit in natural language"
          description="Describe changes in plain English. Curven writes, edits, and explains code for you — like having an AI pair programmer."
          img={
            <PlaceholderImg text="NL Edit" className="w-full h-full" />
          }
        />
      </section>
      {/* Build software faster section */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 py-14 px-4 md:px-8">
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 dark:text-white">Build software faster</h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-lg">From boilerplate to production, Curven accelerates every step. Automate repetitive work, catch issues early, and focus on what matters.</p>
        </div>
        <div className="flex-1 flex flex-col md:flex-row gap-6 justify-end">
          <FeatureCard
            title="AI Suggestions"
            text="Context-aware code completions and refactors powered by the latest models."
            icon={
              <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
                <defs>
                  <linearGradient id="cube1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="60%" stopColor="#a21caf" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
                <rect x="4" y="4" width="20" height="20" rx="5" fill="url(#cube1)" />
              </svg>
            }
          />
          <FeatureCard
            title="Instant Navigation"
            text="Jump to function, file, or symbol in milliseconds, no matter the codebase size."
            icon={
              <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
                <defs>
                  <linearGradient id="cube2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <rect x="4" y="4" width="20" height="20" rx="5" fill="url(#cube2)" />
              </svg>
            }
          />
          <FeatureCard
            title="Explain & Document"
            text="Let Curven write docstrings, comments, and API docs for you. Stay focused on logic."
            icon={
              <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
                <defs>
                  <linearGradient id="cube3" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <rect x="4" y="4" width="20" height="20" rx="5" fill="url(#cube3)" />
              </svg>
            }
          />
        </div>
      </section>
      {/* Testimonials */}
      <section id="testimonials" className="bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#18181d] dark:via-[#16161a] dark:to-[#101013] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Loved by developers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col h-full justify-between text-white relative">
                <div className="flex items-center gap-3 mb-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400 bg-gray-800" loading="lazy" />
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-indigo-200">{t.role}</div>
                  </div>
                </div>
                <blockquote className="text-lg font-medium leading-relaxed flex-1">“{t.quote}”</blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="relative py-20 px-2 sm:px-0"
        style={{
          background:
            'repeating-linear-gradient(-23deg, #1a1a1e 0px, #1a1a1e 20px, #222229 20px, #222229 40px)'
        }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6 py-10 rounded-3xl">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-5 text-white">Try Curven now</h2>
            <p className="text-lg mb-6 text-gray-200 max-w-md">Experience the next generation of code editing. Sign up and get started instantly—no credit card required.</p>
            <button
              onClick={() => navigate("/login")}
              className="rounded-full font-semibold px-8 py-4 text-lg text-indigo-700 bg-white shadow-lg border-2 border-white hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition"
            >
              Get Started Free
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <GradientCubeImg className="w-72 h-72 md:w-96 md:h-96" />
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-4 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-10 mb-8">
          <div>
            <div className="text-white font-bold text-lg lowercase mb-4 flex items-center gap-2">
              <img src={logo} alt="Curven logo" className="w-7 h-7" />
              curven
            </div>
            <p className="text-gray-400 text-sm">The AI code editor for teams and solo devs.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#pricing" className="hover:underline">Pricing</a></li>
              <li><a href="#faq" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Docs</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Community</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Curven. All rights reserved.
        </div>
      </footer>
    </div>
  );
}