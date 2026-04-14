"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { 
  LotusIcon, 
  DiyaIcon, 
  BanyanTreeIcon, 
  SanskarLogo 
} from "@/components/SanskarIcons";
import { 
  ArrowRight, 
  PlayCircle, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles,
  ChevronRight
} from "lucide-react";

const features = [
  { 
    icon: <LotusIcon className="w-8 h-8" />, 
    title: "Compassionate Content", 
    desc: "Curated videos that teach empathy, kindness, and moral integrity." 
  },
  { 
    icon: <BanyanTreeIcon className="w-8 h-8" />, 
    title: "Rooted Growth", 
    desc: "Strong character building based on timeless values and modern logic." 
  },
  { 
    icon: <DiyaIcon className="w-8 h-8" />, 
    title: "Wise Discovery", 
    desc: "A non-addictive space where curiosity leads to wisdom, not distraction." 
  },
];

const ageGroups = [
  { range: "4–6", label: "Little Explorers", color: "bg-forest-50 text-forest-700 dark:bg-forest-900/20 dark:text-forest-400" },
  { range: "7–9", label: "Young Learners", color: "bg-saffron-50 text-saffron-700 dark:bg-saffron-900/20 dark:text-saffron-400" },
  { range: "10–12", label: "Creative Thinkers", color: "bg-earth-50 text-earth-700 dark:bg-earth-900/20 dark:text-earth-400" },
  { range: "13+", label: "Future Leaders", color: "bg-sandalwood-100 text-sandalwood-800 dark:bg-sandalwood-900/20 dark:text-sandalwood-300" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-sandalwood-50 dark:bg-neutral-950 transition-colors duration-500">
      <Navbar transparent />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-saffron-100 dark:bg-saffron-900/10 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-forest-100 dark:bg-forest-900/10 rounded-full blur-[100px] opacity-40" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/50 dark:bg-neutral-900/50 border border-sandalwood-200 dark:border-neutral-800 px-4 py-2 rounded-full backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-saffron-500" />
              <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 tracking-tight">Purposeful Technology for Children</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white leading-[1.1]">
              Ancient Values.<br />
              <span className="text-saffron-500 italic">Modern Minds.</span>
            </h1>

            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              A calm, meditative platform designed to replace addictive loops with character-building video experiences.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
              <Link href="/signup" className="btn-primary text-lg !px-10 !py-4 shadow-xl shadow-saffron-200 dark:shadow-saffron-900/40">
                Join the Community
              </Link>
              <Link href="#features" className="text-neutral-600 dark:text-neutral-400 font-bold hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors flex items-center gap-2 group">
                Discover our Vibe <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="relative lg:block hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-saffron-50 to-forest-50 dark:from-saffron-900/20 dark:to-forest-900/20 rounded-full blur-[80px]" />
            <div className="relative z-10 animate-float flex justify-center">
              {/* Meditative Logo placeholder */}
              <div className="w-72 h-72 bg-white dark:bg-neutral-900 rounded-[4rem] shadow-2xl flex items-center justify-center border-8 border-sandalwood-100 dark:border-neutral-800">
                <DiyaIcon className="w-40 h-40" color="#D4B07A" flameColor="#F97316" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 bg-white/30 dark:bg-neutral-900/30 border-y border-sandalwood-100 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center text-center md:text-left">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 bg-saffron-50 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-400 text-xs font-bold uppercase tracking-widest rounded-lg">Our Philosophy</div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-white leading-tight">
                Not a Slot Machine.<br />A Digital Sanctuary.
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Most platforms are built to harvest attention. <span className="text-neutral-900 dark:text-white font-bold italic">Sanskar Digital</span> is built to nourish it. We replace shallow scrolling with deep learning through value-based storytelling and video.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="card p-8 bg-forest-50 dark:bg-forest-900/20 border-none flex flex-col items-center text-center">
                <ShieldCheck className="w-10 h-10 text-forest-600 mb-4" />
                <h4 className="font-bold text-neutral-900 dark:text-white mb-2">Safe Space</h4>
                <p className="text-sm text-neutral-500">Zero ads, zero data tracking for kids.</p>
              </div>
              <div className="card p-8 bg-saffron-50 dark:bg-saffron-900/20 border-none flex flex-col items-center text-center">
                <HeartHandshake className="w-10 h-10 text-saffron-600 mb-4" />
                <h4 className="font-bold text-neutral-900 dark:text-white mb-2">Value Driven</h4>
                <p className="text-sm text-neutral-500">100% video content focused on character.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-display font-bold text-neutral-900 dark:text-white">Designed for Stillness</h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed">
              We avoid "addictive loops" and slot-machine style animations. Every interaction is soft, intentional, and respectful of a child's attention.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="card p-10 bg-white dark:bg-neutral-900/50 hover:border-saffron-200 dark:hover:border-saffron-900/30 transition-all duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-sandalwood-50 dark:bg-neutral-800 text-sandalwood-600 dark:text-neutral-400 flex items-center justify-center mb-8 group-hover:bg-saffron-500 group-hover:text-white transition-all duration-500 shadow-sm">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">{f.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section id="age-groups" className="py-24 px-6 bg-earth-50/30 dark:bg-neutral-900/20">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-neutral-900 dark:text-white mb-4">Content for Every Stage</h2>
          <p className="text-neutral-500 dark:text-neutral-400">Tailored learning paths that grow with your child's maturity and curiosity.</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {ageGroups.map((ag, i) => (
            <div key={i} className="card p-8 bg-white dark:bg-neutral-900 border-none hover:shadow-xl transition-all duration-500 group text-center">
              <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] ${ag.color} mb-6`}>
                Ages {ag.range}
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white leading-tight">{ag.label}</h3>
              <div className="mt-4 pt-4 border-t border-sandalwood-50 dark:border-neutral-800 text-saffron-500 font-bold text-xs tracking-widest hidden group-hover:block animate-fade-in">
                EXPLORE VIDEOS
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6">
        <div className="max-w-4xl mx-auto bg-earth-900 dark:bg-neutral-900 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-500/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-forest-500/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10 space-y-10">
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-white/10 rounded-full backdrop-blur-md">
                <DiyaIcon className="w-16 h-16" color="#FFF" flameColor="#FDBA74" />
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
              Ancient Wisdom for a Modern World.
            </h2>
            <p className="text-sandalwood-100 text-lg max-w-lg mx-auto opacity-80 leading-relaxed">
              Join a mindful community of parents committed to balanced screen time and lifelong character growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/signup" className="btn-primary !px-12 !py-5 text-lg !bg-white !text-earth-900 hover:!bg-sandalwood-50">
                Create Parent Account
              </Link>
              <Link href="/login" className="text-white font-bold hover:text-saffron-400 transition-colors border-b border-white/20 pb-1">
                Guardian Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-sandalwood-100 dark:border-neutral-800 text-center bg-white/50 dark:bg-neutral-950">
        <div className="flex items-center justify-center gap-3 mb-8">
          <SanskarLogo className="w-10 h-10" />
          <span className="font-display font-bold text-2xl text-neutral-900 dark:text-white">Sanskar Digital</span>
        </div>
        <div className="flex justify-center gap-8 mb-8 text-sm text-neutral-500 dark:text-neutral-400 font-medium tracking-wide">
          <Link href="#features" className="hover:text-saffron-500 transition-colors">FEATURES</Link>
          <Link href="#age-groups" className="hover:text-saffron-500 transition-colors">LEARNING</Link>
          <Link href="/login" className="hover:text-saffron-500 transition-colors">LOGIN</Link>
        </div>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.3em]">
          © 2024 SANSKAR DIGITAL. DESIGNED FOR PEACE OF MIND.
        </p>
      </footer>
    </main>
  );
}
