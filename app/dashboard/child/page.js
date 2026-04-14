"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";
import { SanskarLogo, DiyaIcon, LotusIcon } from "@/components/SanskarIcons";
import { 
  Play, 
  Award, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  LogOut, 
  Trophy,
  Activity,
  CheckCircle2,
  X,
  Sparkles
} from "lucide-react";

export default function ChildDashboard() {
  const router = useRouter();
  const { user, token, getHeaders, logout, initialize } = useAuthStore();
  const [videos, setVideos] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null); // The video currently playing
  const [pointMessage, setPointMessage] = useState("");

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (!token || user?.role !== "child") {
       router.push("/login");
       return;
    }
    fetchData();
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!user) return;
      // 1. Fetch Age-Appropriate Content
      const cRes = await fetch(`/api/content?ageGroup=${user.ageGroup || "all"}&approved=true`, { headers: getHeaders() });
      const cData = await cRes.json();
      setVideos(cData.content || []);

      // 2. Fetch Personal Progress
      const pRes = await fetch("/api/progress", { headers: getHeaders() });
      const pData = await pRes.json();
      setProgress(pData.child || null);
    } catch (err) {
      console.error("Fetch child data error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoComplete = async (videoId) => {
    try {
       const res = await fetch("/api/watch", {
         method: "POST",
         headers: getHeaders(),
         body: JSON.stringify({ videoId }),
       });
       const data = await res.json();
       
       if (res.ok && !data.alreadyWatched) {
          const badgeText = data.newBadge ? `🎉 Achievement Unlocked: ${data.newBadge.name}!` : "";
          setPointMessage(`+5 Sanskar Points Earned! ${badgeText}`);
          fetchData(); 
          setTimeout(() => setPointMessage(""), 6000);
       }
    } catch (err) {
       console.error("Point award error:", err);
    }
  };

  // --- Achievement Helpers ---
  const getWisdomTitle = (xp) => {
    if (!xp) return "Student";
    if (xp >= 500) return "Sanskar Pathik";
    if (xp >= 200) return "Dhairyavan";
    if (xp >= 100) return "Sanjeev";
    if (xp >= 50) return "Seeker";
    return "Student";
  };

  const getSanskarTree = (xp) => {
    if (!xp) return "🌱";
    if (xp >= 151) return "🌳";
    if (xp >= 51) return "🌿";
    return "🌱";
  };

  const currentLevelTitle = getWisdomTitle(progress?.xp || 0);
  const currentTree = getSanskarTree(progress?.xp || 0);

  if (loading) return (
    <div className="min-h-screen bg-sandalwood-50 dark:bg-neutral-950 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-forest-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="min-h-screen bg-sandalwood-50 dark:bg-neutral-950 transition-colors duration-500 pb-24">
      
      {/* Top Navigation - Large & Friendly */}
      <header className="h-24 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-sandalwood-100 dark:border-neutral-800 sticky top-0 z-40 px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-4">
               <SanskarLogo className="w-12 h-12" />
               <div className="hidden md:block">
                  <h1 className="font-display font-bold text-2xl text-neutral-900 dark:text-white tracking-tight leading-none">Learning Space</h1>
                  <p className="text-[10px] font-black uppercase tracking-widest text-forest-500 mt-1">Calm • Focused • Wise</p>
               </div>
            </Link>
          </div>

          <div className="flex items-center gap-6">
             {/* Progress Pill */}
             <div className="bg-white dark:bg-neutral-800 border-2 border- forest-100 dark:border-neutral-700 px-6 py-2.5 rounded-2xl flex items-center gap-4 shadow-sm relative group overflow-hidden">
                <div className="text-right">
                   <p className="text-[10px] uppercase font-black tracking-widest text-neutral-400">Wisdom XP</p>
                   <p className={`text-lg font-display font-bold leading-none ${progress?.xp >= 100 ? "text-saffron-600 animate-pulse" : "text-forest-600"}`}>
                      {progress?.xp || 0}
                   </p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${progress?.xp >= 100 ? "bg-saffron-50 dark:bg-saffron-900/40 text-saffron-600" : "bg-forest-50 dark:bg-forest-900/30 text-forest-500"}`}>
                   {progress?.xp >= 100 ? <Sparkles className="w-5 h-5 shadow-inner" /> : <Trophy className="w-5 h-5" />}
                </div>
             </div>

             <button onClick={logout} className="p-3.5 rounded-2xl bg-sandalwood-50 dark:bg-neutral-800 text-neutral-400 hover:text-red-500 transition-colors">
                <LogOut className="w-6 h-6" />
             </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        
        {/* Welcome Section */}
        <div className="grid lg:grid-cols-3 gap-12 items-end mb-16">
          <div className="lg:col-span-2 space-y-4">
             <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-saffron-50 dark:bg-saffron-900/20 text-saffron-600 rounded-lg text-xs font-black uppercase tracking-widest">
                   <Star className="w-3 h-3 fill-current" /> Hello, {user?.name}!
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest-50 dark:bg-forest-900/20 text-forest-600 rounded-lg text-xs font-black uppercase tracking-widest">
                   Level: {currentLevelTitle}
                </div>
             </div>
             <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 dark:text-white">What shall we learn today?</h2>
             <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-xl">Every video brings you 5 Sanskar Points and takes you closer to your next Stage of Wisdom.</p>
          </div>

          {/* Points Progress Bar */}
          <div className={`card p-6 bg-white dark:bg-neutral-900 border-none shadow-xl transition-all duration-500 ${progress?.xp >= 100 ? 'ring-4 ring-saffron-100 dark:ring-saffron-900/20' : ''}`}>
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                   <span className="text-2xl">{currentTree}</span>
                   <p className="text-xs font-black uppercase tracking-widest text-neutral-400">Sanskar Growth</p>
                </div>
                <Award className={`w-4 h-4 ${progress?.xp >= 100 ? "text-saffron-500 animate-bounce" : "text-neutral-300"}`} />
             </div>
             <div className="h-3 bg-sandalwood-50 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${progress?.xp >= 100 ? "bg-gradient-to-r from-saffron-400 to-saffron-600 shadow-lg shadow-saffron-200" : "bg-forest-500"}`}
                  style={{ width: `${(progress?.xp % 100)}%` }}
                />
             </div>
             <div className="flex justify-between mt-3 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                <span className={progress?.xp >= 100 ? "text-saffron-600 font-black": ""}>{progress?.xp >= 100 ? "Stage: Sanjeev" : "Stage: Rising Student"}</span>
                <span>{(100 - (progress?.xp % 100))} pts to next</span>
             </div>
          </div>
        </div>

        {/* Floating Point Notification */}
        {pointMessage && (
          <div className="fixed top-28 left-1/2 -translate-x-1/2 z-50 bg-forest-600 text-white px-8 py-4 rounded-3xl shadow-2xl shadow-forest-200 dark:shadow-neutral-950 flex items-center gap-4 animate-slide-down border-2 border-white/20">
             <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 transition-transform animate-scale" />
             </div>
             <span className="font-bold text-sm tracking-tight">{pointMessage}</span>
          </div>
        )}

        {/* Video Feed Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((v) => (
            <div 
              key={v._id} 
              className="group card bg-white dark:bg-neutral-900 border-none shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col cursor-pointer"
              onClick={() => setActiveVideo(v)}
            >
              <div className="relative aspect-video overflow-hidden">
                 <img 
                    src={v.thumbnailUrl || "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&q=80&w=800"} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                    alt={v.title} 
                 />
                 <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/0 transition-colors" />
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-saffron-600 shadow-xl scale-90 group-hover:scale-100 transition-transform">
                       <Play className="w-6 h-6 fill-current" />
                    </div>
                 </div>
                 {user?.completedVideoIds?.includes(v._id) && (
                    <div className="absolute top-4 right-4 bg-forest-500 text-white p-2 rounded-xl shadow-lg">
                       <CheckCircle2 className="w-4 h-4" />
                    </div>
                 )}
              </div>

              <div className="p-8 flex-1 flex flex-col space-y-4">
                 <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-forest-50 dark:bg-forest-900/30 flex items-center justify-center text-forest-600">
                       <LotusIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Lesson</span>
                 </div>
                 <h3 className="text-xl font-bold text-neutral-900 dark:text-white leading-tight group-hover:text-saffron-600 transition-colors">{v.title}</h3>
                 <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">{v.description}</p>
                 <div className="pt-4 mt-auto flex items-center justify-between border-t border-sandalwood-50 dark:border-neutral-800">
                    <div className="flex items-center gap-1.5 text-saffron-600 font-bold text-xs uppercase tracking-widest">
                       <Star className="w-3.5 h-3.5 fill-current" />
                       5 Points
                    </div>
                    <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:translate-x-1 transition-transform" />
                 </div>
              </div>
            </div>
          ))}

          {videos.length === 0 && (
            <div className="col-span-full py-32 text-center prose dark:prose-invert mx-auto">
               <h3 className="text-neutral-300 font-display italic">New wisdom is being prepared for you...</h3>
               <p className="text-sm text-neutral-400 font-bold uppercase tracking-[0.3em]">Check back soon</p>
            </div>
          )}
        </div>

        {/* Badges Section Bottom */}
        <div className="mt-32 border-t-2 border-dashed border-sandalwood-100 dark:border-neutral-800 pt-20">
           <div className="text-center mb-12">
              <h3 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">Your Badges of Honor</h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-2">Every milestone reached is a step towards greatness.</p>
           </div>
           <div className="flex flex-wrap justify-center gap-8">
              {progress?.badges?.length > 0 ? (
                 progress.badges.map((badge, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 group">
                       <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl shadow-xl animate-fade-in border-4 transition-all duration-500 ${badge.icon === '🪔' ? 'bg-saffron-50 dark:bg-saffron-900/40 border-saffron-200' : 'bg-white dark:bg-neutral-900 border-saffron-50 dark:border-neutral-800'}`}>
                          {badge.icon || "🎖️"}
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 max-w-[100px] text-center leading-tight">
                          {badge.name}
                       </span>
                    </div>
                 ))
              ) : (
                 <div className="p-10 bg-white/50 dark:bg-neutral-900/50 rounded-[2.5rem] border border-dashed border-sandalwood-200 dark:border-neutral-800 text-neutral-400 text-sm italic">
                    Earn 100 points to unlock your first major title: Sanjeev!
                 </div>
              )}
           </div>
        </div>
      </div>

      {/* Full Screen Video Player Overlay */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex flex-col p-6 animate-fade-in">
           <div className="max-w-6xl mx-auto w-full flex items-center justify-between py-6">
              <div className="flex items-center gap-4">
                 <button 
                   onClick={() => setActiveVideo(null)}
                   className="p-3 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-colors"
                 >
                    <ChevronLeft className="w-6 h-6" />
                 </button>
                 <div>
                    <h4 className="text-xl font-bold text-white tracking-tight">{activeVideo.title}</h4>
                    <p className="text-xs font-bold text-saffron-400 uppercase tracking-widest">Focus Mode Active</p>
                 </div>
              </div>
              <button 
                onClick={() => setActiveVideo(null)}
                className="p-3 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-colors"
              >
                 <X className="w-6 h-6" />
              </button>
           </div>

           <div className="flex-1 max-w-6xl mx-auto w-full flex items-center justify-center">
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border-4 border-white/5">
                 {activeVideo.videoUrl.startsWith("/uploads") ? (
                    <video 
                      src={activeVideo.videoUrl} 
                      className="w-full h-full"
                      controls
                      autoPlay
                      onPlay={() => handleVideoComplete(activeVideo._id)}
                    />
                 ) : (
                    <iframe 
                      src={`${activeVideo.videoUrl}?autoplay=1&rel=0&modestbranding=1`} 
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      onLoad={() => {
                         handleVideoComplete(activeVideo._id);
                      }}
                    />
                 )}
              </div>
           </div>

           <div className="max-w-4xl mx-auto w-full py-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full text-white/60">
                 <Activity className="w-4 h-4 text-forest-400" />
                 <span className="text-sm font-medium">Points will be awarded automatically for focused learning.</span>
              </div>
           </div>
        </div>
      )}
    </main>
  );
}
