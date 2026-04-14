"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";
import { SanskarLogo } from "@/components/SanskarIcons";
import { 
  Users, 
  Plus, 
  LayoutDashboard, 
  Clock, 
  Award, 
  TrendingUp, 
  ChevronRight,
  LogOut,
  Calendar,
  Activity,
  UserPlus
} from "lucide-react";

export default function ParentDashboard() {
  const router = useRouter();
  const { user, token, getHeaders, logout, initialize } = useAuthStore();
  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [childProgress, setChildProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Add Child Form state
  const [newChild, setNewChild] = useState({ name: "", email: "", password: "", ageGroup: "7-9" });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (!token || user?.role !== "parent") {
      router.push("/login");
      return;
    }
    fetchChildren();
  }, [token]);

  useEffect(() => {
    if (selectedChildId) {
      fetchChildProgress(selectedChildId);
    }
  }, [selectedChildId]);

  const fetchChildren = async () => {
    try {
      const res = await fetch("/api/children", { headers: getHeaders() });
      const data = await res.json();
      setChildren(data.children || []);
      if (data.children?.length > 0 && !selectedChildId) {
        setSelectedChildId(data.children[0]._id);
      }
      setLoading(false);
    } catch (err) {
      console.error("Fetch children error:", err);
      setLoading(false);
    }
  };

  const fetchChildProgress = async (id) => {
    try {
      const res = await fetch(`/api/progress?childId=${id}`, { headers: getHeaders() });
      const data = await res.json();
      setChildProgress(data);
    } catch (err) {
      console.error("Fetch progress error:", err);
    }
  };

  const handleAddChild = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError("");
    try {
      const res = await fetch("/api/auth/add-child", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(newChild),
      });
      const data = await res.json();
      if (res.ok) {
        setShowAddModal(false);
        setNewChild({ name: "", email: "", password: "", ageGroup: "7-9" });
        fetchChildren();
      } else {
        setAddError(data.error || "Failed to add profile");
      }
    } catch (err) {
      setAddError("Network error");
    } finally {
      setAddLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-sandalwood-50 dark:bg-neutral-950 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="min-h-screen bg-sandalwood-50 dark:bg-neutral-950 transition-colors duration-500 pb-20">
      {/* Navbar Container */}
      <header className="h-20 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border-b border-sandalwood-100 dark:border-neutral-800 sticky top-0 z-40 px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <SanskarLogo className="w-10 h-10" />
              <span className="font-display font-bold text-xl text-neutral-900 dark:text-white hidden sm:block tracking-tight text-balance">Parent Insight Hub</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
             <button 
               onClick={() => setShowAddModal(true)}
               className="hidden md:flex items-center gap-2 bg-forest-50 dark:bg-forest-900/20 text-forest-700 dark:text-forest-400 px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-forest-100 transition-all border border-forest-100 dark:border-forest-900/50"
             >
                <Plus className="w-4 h-4" /> Add Child Profile
             </button>
             <div className="h-8 w-px bg-sandalwood-100 dark:bg-neutral-800 hidden md:block" />
             <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                   <p className="text-sm font-bold text-neutral-900 dark:text-white leading-tight">{user?.name}</p>
                   <p className="text-[10px] tracking-widest uppercase text-neutral-400 font-bold">Guardian</p>
                </div>
                <button onClick={logout} className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 transition-colors">
                   <LogOut className="w-5 h-5" />
                </button>
             </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        
        {/* Children Selector */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
          {children.map((child) => (
            <button
              key={child._id}
              onClick={() => setSelectedChildId(child._id)}
              className={`flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl transition-all border-2 ${
                selectedChildId === child._id
                  ? "bg-white dark:bg-neutral-900 border-saffron-500 shadow-xl shadow-sandalwood-200 dark:shadow-neutral-950/50 scale-[1.05]"
                  : "bg-white/50 dark:bg-neutral-900/50 border-transparent text-neutral-400 hover:bg-white dark:hover:bg-neutral-900"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                selectedChildId === child._id ? "bg-saffron-500 text-white" : "bg-sandalwood-100 dark:bg-neutral-800"
              }`}>
                {child.name[0]}
              </div>
              <div className="text-left">
                <p className={`font-bold text-sm ${selectedChildId === child._id ? "text-neutral-900 dark:text-white" : "text-neutral-500"}`}>{child.name}</p>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Ages {child.ageGroup}</p>
              </div>
            </button>
          ))}
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl border-2 border-dashed border-sandalwood-200 dark:border-neutral-800 text-sandalwood-300 hover:border-saffron-400 hover:text-saffron-400 transition-all"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {selectedChildId && childProgress ? (
          <div className="grid lg:grid-cols-3 gap-8 animate-fade-in">
            
            {/* Main Stats Column */}
            <div className="lg:col-span-2 space-y-8">
               
               {/* Dashboard Cards Grid */}
               <div className="grid sm:grid-cols-2 gap-6">
                  <div className="card p-8 border-none bg-gradient-to-br from-white to-sandalwood-50 dark:from-neutral-900 dark:to-neutral-950">
                     <div className="flex items-center justify-between mb-6">
                        <div className="p-3 rounded-2xl bg-saffron-50 dark:bg-saffron-900/20 text-saffron-500">
                           <TrendingUp className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Activity Level</span>
                     </div>
                     <div className="space-y-1">
                        <p className="text-4xl font-display font-bold text-neutral-900 dark:text-white">{childProgress.child.xp}</p>
                        <p className="text-sm text-neutral-500 font-medium">Sanskar Points (XP)</p>
                     </div>
                     <div className="mt-6 h-2 bg-sandalwood-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-saffron-500 transition-all duration-1000" 
                          style={{ width: `${(childProgress.child.xp % 100)}%` }}
                        />
                     </div>
                     <p className="mt-2 text-[10px] font-bold text-neutral-400 tracking-wide uppercase">
                        {(100 - (childProgress.child.xp % 100))} pts to next badge
                     </p>
                  </div>

                  <div className="card p-8 border-none bg-gradient-to-br from-white to-forest-50/30 dark:from-neutral-900 dark:to-neutral-950">
                     <div className="flex items-center justify-between mb-6">
                        <div className="p-3 rounded-2xl bg-forest-50 dark:bg-forest-900/20 text-forest-600">
                           <Clock className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Screen Balance</span>
                     </div>
                     <div className="space-y-1">
                        <p className="text-4xl font-display font-bold text-neutral-900 dark:text-white">{childProgress.child.estimatedScreenTimeToday}m</p>
                        <p className="text-sm text-neutral-500 font-medium">Recorded Today</p>
                     </div>
                     <div className="mt-6 flex items-center justify-between">
                        <div className="flex -space-x-2">
                           {[...Array(5)].map((_, i) => (
                             <div key={i} className={`w-2 h-2 rounded-full ${i < (childProgress.child.estimatedScreenTimeToday / 10) ? 'bg-forest-500' : 'bg-sandalwood-200 dark:bg-neutral-700'}`} />
                           ))}
                        </div>
                        <span className="text-[10px] font-bold text-forest-600 uppercase tracking-widest">Healthy Range</span>
                     </div>
                  </div>
               </div>

               {/* Activity Feed Table */}
               <div className="card p-8 bg-white dark:bg-neutral-900 border-none shadow-xl overflow-hidden">
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-earth-50 dark:bg-earth-900/20 flex items-center justify-center text-earth-600">
                           <Activity className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Recent Learning</h3>
                     </div>
                  </div>

                  <div className="space-y-4">
                     {childProgress.recentActivity?.length > 0 ? (
                       childProgress.recentActivity.map((log) => (
                         <div key={log._id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-sandalwood-50 dark:hover:bg-neutral-800/40 transition-colors group">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center text-saffron-500 shadow-sm">
                                 <Plus className="w-4 h-4" />
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-neutral-900 dark:text-white">{log.videoId?.title || "Video Lesson"}</p>
                                 <div className="flex items-center gap-2 mt-0.5">
                                    <Calendar className="w-3 h-3 text-neutral-400" />
                                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                                       {new Date(log.watchedAt).toLocaleDateString()} at {new Date(log.watchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                 </div>
                              </div>
                           </div>
                           <div className="text-right">
                              <span className="text-xs font-black text-forest-600">+5 PTS</span>
                           </div>
                         </div>
                       ))
                     ) : (
                       <div className="py-20 text-center space-y-3">
                          <p className="text-neutral-400 text-sm italic">No recent activity detected.</p>
                          <p className="text-xs text-neutral-400">Learning sessions will appear here.</p>
                       </div>
                     )}
                  </div>
               </div>
            </div>

            {/* Sidebar Stats Column */}
            <div className="space-y-8">
               
               {/* Profile Info Card */}
               <div className="card p-8 bg-white dark:bg-neutral-900 border-none text-center">
                  <div className="w-24 h-24 mx-auto bg-sandalwood-50 dark:bg-neutral-800 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner">
                     <span className="text-4xl">🧘</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-2">{childProgress.child.name}</h3>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-saffron-50 dark:bg-saffron-900/20 text-saffron-700 dark:text-saffron-400 text-[10px] font-black uppercase tracking-widest mb-6">
                     Stage: Ages {childProgress.child.ageGroup}
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-sandalwood-50 dark:border-neutral-800 pt-6">
                     <div>
                        <p className="text-xl font-bold text-neutral-900 dark:text-white">{childProgress.child.completedVideosCount}</p>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Videos Watched</p>
                     </div>
                     <div>
                        <p className="text-xl font-bold text-neutral-900 dark:text-white">{childProgress.child.streak}d</p>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Current Streak</p>
                     </div>
                  </div>
               </div>

               {/* Badge Grid */}
               <div className="card p-8 bg-white dark:bg-neutral-900 border-none">
                  <div className="flex items-center gap-3 mb-8">
                     <Award className="w-5 h-5 text-saffron-500" />
                     <h4 className="font-bold text-neutral-900 dark:text-white uppercase text-xs tracking-widest">Badges of Honor</h4>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                     {childProgress.child.badges?.length > 0 ? (
                       childProgress.child.badges.map((badge, i) => (
                         <div key={i} className="group relative">
                            <div className="aspect-square rounded-2xl bg-sandalwood-50 dark:bg-neutral-800 flex items-center justify-center text-2xl grayscale-0 hover:scale-110 transition-transform cursor-help shadow-sm">
                               {badge.icon || "🎖️"}
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[120px] bg-neutral-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                               {badge.name}
                            </div>
                         </div>
                       ))
                     ) : (
                       [...Array(8)].map((_, i) => (
                         <div key={i} className="aspect-square rounded-2xl border-2 border-dashed border-sandalwood-100 dark:border-neutral-800 flex items-center justify-center opacity-30">
                            <Award className="w-5 h-5 text-neutral-300" />
                         </div>
                       ))
                     )}
                  </div>
               </div>

            </div>
          </div>
        ) : !loading && children.length === 0 ? (
          <div className="py-32 text-center animate-fade-in">
             <div className="w-24 h-24 mx-auto bg-white dark:bg-neutral-900 rounded-[2.5rem] flex items-center justify-center text-3xl mb-8 shadow-xl">
                👋
             </div>
             <h2 className="text-3xl font-display font-bold text-neutral-900 dark:text-white mb-4">Welcome to Sanskar Digital!</h2>
             <p className="text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto mb-10 leading-relaxed">
                Connect with your child's learning journey by creating their first independent profile.
             </p>
             <button 
               onClick={() => setShowAddModal(true)}
               className="btn-primary !px-10 !py-4 flex items-center gap-2 mx-auto"
             >
                <UserPlus className="w-5 h-5" /> Get Started Now
             </button>
          </div>
        ) : null}
      </div>

      {/* Add Child Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-neutral-900/60 backdrop-blur-sm animate-fade-in">
          <div className="card p-10 w-full max-w-md bg-white dark:bg-neutral-900 border-none shadow-2xl">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-display font-bold text-neutral-900 dark:text-white">Add New Profile</h3>
                <button onClick={() => setShowAddModal(false)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
                   <ChevronRight className="w-6 h-6 rotate-90" />
                </button>
             </div>

             <form onSubmit={handleAddChild} className="space-y-5">
                {addError && <p className="text-xs font-bold text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">{addError}</p>}
                
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Child's Name</label>
                   <input 
                     type="text" 
                     required 
                     className="input-field !py-3 bg-sandalwood-50 dark:bg-neutral-800"
                     value={newChild.name}
                     onChange={e => setNewChild({...newChild, name: e.target.value})}
                   />
                </div>

                <div className="space-y-1.5">
                   <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Account Email</label>
                   <input 
                     type="email" 
                     required 
                     className="input-field !py-3 bg-sandalwood-50 dark:bg-neutral-800"
                     placeholder="Used for child's login"
                     value={newChild.email}
                     onChange={e => setNewChild({...newChild, email: e.target.value})}
                   />
                </div>

                <div className="space-y-1.5">
                   <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Secret Key</label>
                   <input 
                     type="password" 
                     required 
                     minLength={6}
                     className="input-field !py-3 bg-sandalwood-50 dark:bg-neutral-800"
                     value={newChild.password}
                     onChange={e => setNewChild({...newChild, password: e.target.value})}
                   />
                </div>

                <div className="space-y-1.5">
                   <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Age Category</label>
                   <select 
                     className="input-field !py-3 bg-sandalwood-50 dark:bg-neutral-800 appearance-none"
                     value={newChild.ageGroup}
                     onChange={e => setNewChild({...newChild, ageGroup: e.target.value})}
                   >
                     <option value="4-6">4–6 years</option>
                     <option value="7-9">7–9 years</option>
                     <option value="10-12">10–12 years</option>
                     <option value="13+">13+ years</option>
                   </select>
                </div>

                <div className="pt-4 flex gap-4">
                   <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3.5 rounded-2xl text-xs font-bold text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">Cancel</button>
                   <button type="submit" disabled={addLoading} className="flex-1 btn-primary !py-3.5 shadow-lg shadow-saffron-200 dark:shadow-neutral-950/50">
                     {addLoading ? "Creating..." : "Save Profile"}
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </main>
  );
}
