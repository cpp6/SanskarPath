"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";
import { SanskarLogo } from "@/components/SanskarIcons";
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  AlertCircle, 
  ArrowLeft 
} from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Creation failed. Please try a different email.");
        return;
      }

      login(data.token, data.user);
      router.push("/dashboard/parent");
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-sandalwood-50 dark:bg-neutral-950 flex flex-col items-center justify-center px-6 py-12 transition-colors duration-500 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-forest-100 dark:bg-forest-900/10 rounded-full blur-[120px] opacity-40" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-saffron-100 dark:bg-saffron-900/10 rounded-full blur-[100px] opacity-40" />

      <div className="relative w-full max-w-md">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-forest-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
        </Link>

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <SanskarLogo className="w-16 h-16" />
            <h1 className="font-display font-bold text-4xl text-neutral-900 dark:text-white tracking-tight">
              Create Account
            </h1>
          </div>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium mt-2">Join our mindful community of parents.</p>
        </div>

        <div className="card p-8 md:p-10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-none shadow-2xl shadow-sandalwood-200 dark:shadow-neutral-950/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-3 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl text-[11px] font-bold border border-red-100 dark:border-red-900/50">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Guardian Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300 group-focus-within:text-forest-600 transition-colors" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field !pl-12 !py-3.5 bg-white/50 dark:bg-neutral-800/50"
                  placeholder="Full Name"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Contact Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300 group-focus-within:text-forest-600 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field !pl-12 !py-3.5 bg-white/50 dark:bg-neutral-800/50"
                  placeholder="name@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300 group-focus-within:text-forest-600 transition-colors" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field !pl-12 !py-3.5 bg-white/50 dark:bg-neutral-800/50"
                  placeholder="+91 00000 00000"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Secret Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300 group-focus-within:text-forest-600 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field !pl-12 !py-3.5 bg-white/50 dark:bg-neutral-800/50"
                  placeholder="••••••••"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !py-4 !bg-forest-600 hover:!bg-forest-700 shadow-xl shadow-forest-100 dark:shadow-neutral-950/50 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Initialize Parent Hub"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-400">
              Already a member?{" "}
              <Link href="/login" className="text-saffron-600 hover:text-saffron-700 font-bold underline underline-offset-4 decoration-2">
                Sign in to your path
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300 dark:text-neutral-700">
            Ancient Values. Modern Minds.
          </p>
        </div>
      </div>
    </main>
  );
}
