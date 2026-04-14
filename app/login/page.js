"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";
import { SanskarLogo } from "@/components/SanskarIcons";
import { 
  Mail, 
  Lock, 
  AlertCircle, 
  ArrowLeft, 
  Users, 
  Baby, 
  ShieldCheck 
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("parent"); // 'parent', 'child', or 'admin' 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials. Please try again.");
        return;
      }

      // Check if the actual user role matches the selected role (optional but good for UX)
      if (data.user.role !== role) {
         setError(`This account is registered as a ${data.user.role}. Please select the correct role.`);
         return;
      }

      login(data.token, data.user);
      
      // Navigate based on role
      if (data.user.role === "admin") router.push("/dashboard/admin");
      else if (data.user.role === "child") router.push("/dashboard/child");
      else router.push("/dashboard/parent");

    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-sandalwood-50 dark:bg-neutral-950 flex flex-col items-center justify-center px-6 py-12 transition-colors duration-500 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-saffron-100 dark:bg-saffron-900/10 rounded-full blur-[120px] opacity-40" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-forest-100 dark:bg-forest-900/10 rounded-full blur-[100px] opacity-40" />

      <div className="relative w-full max-w-md">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-saffron-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Home
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-4">
            <SanskarLogo className="w-16 h-16" />
            <h1 className="font-display font-bold text-4xl text-neutral-900 dark:text-white tracking-tight">
              Sanskar Digital
            </h1>
          </div>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium mt-2 italic">Ancient Values. Modern Minds.</p>
        </div>

        <div className="card p-8 md:p-10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-none shadow-2xl shadow-sandalwood-200 dark:shadow-neutral-950/50">
          
          {/* Role Selector */}
          <div className="flex p-1 bg-sandalwood-50 dark:bg-neutral-800 rounded-2xl mb-8">
            {[
              { id: 'parent', label: 'Parent', icon: <Users className="w-4 h-4" /> },
              { id: 'child', label: 'Child', icon: <Baby className="w-4 h-4" /> },
              { id: 'admin', label: 'Admin', icon: <ShieldCheck className="w-4 h-4" /> },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  role === r.id 
                    ? "bg-white dark:bg-neutral-700 text-saffron-600 shadow-md" 
                    : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                }`}
              >
                {r.icon}
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-3 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl text-[11px] font-bold border border-red-100 dark:border-red-900/50">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">
                {role === 'child' ? 'Child Email' : role === 'admin' ? 'Admin Email' : 'Guardian Email'}
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300 group-focus-within:text-saffron-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field !pl-12 !py-4 bg-white/50 dark:bg-neutral-800/50"
                  placeholder="name@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Secret Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-300 group-focus-within:text-saffron-500 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field !pl-12 !py-4 bg-white/50 dark:bg-neutral-800/50"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full !py-4 shadow-xl shadow-saffron-200 dark:shadow-saffron-900/40 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                role === 'child' ? 'Open Learning Space' : 'Enter Dashboard'
              )}
            </button>
          </form>

          {role === 'parent' && (
            <div className="mt-8 text-center">
              <p className="text-sm text-neutral-400">
                New to the community?{" "}
                <Link href="/signup" className="text-forest-600 hover:text-forest-700 font-bold underline underline-offset-4 decoration-2">
                  Create Parent Account
                </Link>
              </p>
            </div>
          )}
        </div>

        <p className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.4em] text-neutral-300 dark:text-neutral-700">
          Sanskar Digital • Wisdom Verified
        </p>
      </div>
    </main>
  );
}
