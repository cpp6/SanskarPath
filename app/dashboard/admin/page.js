"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";
import { SanskarLogo } from "@/components/SanskarIcons";
import { 
  Users, 
  Baby, 
  Video, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  LogOut,
  ExternalLink,
  Upload,
  FileVideo,
  ImageIcon,
  ShieldAlert,
  Fingerprint,
  Search,
  X,
  AlertTriangle
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, token, getHeaders, logout, initialize } = useAuthStore();
  const [activeTab, setActiveTab] = useState("content"); // 'content', 'parents', 'children'
  const [content, setContent] = useState([]);
  const [parents, setParents] = useState([]);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  
  // Upload Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ageGroup: "7-9"
  });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (!token || user?.role !== "admin") {
       if (user?.email !== "admin@gmail.com") {
         router.push("/login");
         return;
       }
    }
    fetchData();
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const cRes = await fetch("/api/content", { headers: getHeaders() });
      const cData = await cRes.json();
      setContent(cData.content || []);

      const uRes = await fetch("/api/admin/users", { headers: getHeaders() });
      const uData = await uRes.json();
      setParents(uData.parents || []);
      setChildren(uData.children || []);
    } catch (err) {
      console.error("Fetch data error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      setMessage({ type: "error", text: "Please select a video file." });
      return;
    }

    setFormLoading(true);
    setMessage({ type: "", text: "" });

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("ageGroup", formData.ageGroup);
    data.append("videoFile", videoFile);
    if (thumbnailFile) {
      data.append("thumbnailFile", thumbnailFile);
    }

    try {
      const headers = getHeaders();
      delete headers["Content-Type"];

      const res = await fetch("/api/content", {
        method: "POST",
        headers: headers,
        body: data,
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Content published successfully!" });
        setFormData({ title: "", description: "", ageGroup: "7-9" });
        setVideoFile(null);
        setThumbnailFile(null);
        e.target.reset();
        fetchData();
      } else {
        const resData = await res.json();
        setMessage({ type: "error", text: resData.error || "Failed to upload content." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error occurred." });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteUser = async (e, userId, role) => {
     e.preventDefault();
     e.stopPropagation();
     
     // Robustness: If first click, just toggle confirmation state
     if (confirmDeleteId !== userId) {
        setConfirmDeleteId(userId);
        // Reset confirmation after 4 seconds of inactivity
        setTimeout(() => setConfirmDeleteId((cur) => cur === userId ? null : cur), 4000);
        return;
     }

     // Second click: Perform the actual delete
     try {
        setConfirmDeleteId(null);
        setLoading(true);
        const res = await fetch(`/api/admin/users?id=${userId}`, {
           method: "DELETE",
           headers: getHeaders()
        });

        if (res.ok) {
           setMessage({ type: "success", text: `Account removed successfuly.` });
           fetchData();
        } else {
           const data = await res.json();
           setMessage({ type: "error", text: data.error || "Deletion failed." });
           setLoading(false);
        }
     } catch (err) {
        console.error("[CLIENT DELETE] Error:", err);
        setMessage({ type: "error", text: "Network error occurred." });
        setLoading(false);
     }
  };

  const handleDeleteContent = async (e, contentId) => {
     e.preventDefault();
     e.stopPropagation();

     if (confirmDeleteId !== contentId) {
        setConfirmDeleteId(contentId);
        setTimeout(() => setConfirmDeleteId((cur) => cur === contentId ? null : cur), 4000);
        return;
     }

     try {
        setConfirmDeleteId(null);
        setLoading(true);
        const res = await fetch(`/api/content?id=${contentId}`, {
           method: "DELETE",
           headers: getHeaders()
        });

        if (res.ok) {
           setMessage({ type: "success", text: `Content deleted.` });
           fetchData();
        } else {
           const data = await res.json();
           setMessage({ type: "error", text: data.error || "Failed to delete content." });
           setLoading(false);
        }
     } catch (err) {
        setMessage({ type: "error", text: "Network error occurred." });
        setLoading(false);
     }
  };

  // --- Filtering Logic ---
  const filteredParents = parents.filter(p => 
     p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.id?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChildren = children.filter(c => 
     c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     c.id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
     c.parentId?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredContent = content.filter(item => 
     item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && !content.length) return (
    <div className="min-h-screen bg-sandalwood-50 dark:bg-neutral-950 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <main className="min-h-screen bg-sandalwood-50 dark:bg-neutral-950 transition-colors duration-500 pb-20">
      <header className="h-20 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border-b border-sandalwood-100 dark:border-neutral-800 sticky top-0 z-40 px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <SanskarLogo className="w-10 h-10" />
              <span className="font-display font-bold text-xl text-neutral-900 dark:text-white hidden sm:block tracking-tight">Admin Dashboard</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-neutral-900 dark:text-white leading-tight">Administrator</p>
                <p className="text-[10px] uppercase tracking-widest text-neutral-400">Platform Manager</p>
             </div>
             <button onClick={logout} className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                <LogOut className="w-5 h-5" />
             </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-2">
            {[
              { id: 'content', label: 'Content Management', icon: <Video className="w-5 h-5" /> },
              { id: 'parents', label: 'Guardian List', icon: <Users className="w-5 h-5" /> },
              { id: 'children', label: 'Child Accounts', icon: <Baby className="w-5 h-5" /> },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                   setActiveTab(tab.id);
                   setSearchTerm("");
                   setConfirmDeleteId(null);
                }}
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? "bg-saffron-500 text-white shadow-lg shadow-saffron-200 dark:shadow-neutral-950/50 scale-[1.02]" 
                    : "text-neutral-500 hover:bg-white dark:hover:bg-neutral-900 dark:text-neutral-400"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </aside>

          <div className="lg:col-span-3 space-y-8 animate-fade-in">
            {activeTab === 'content' && (
              <div className="space-y-8">
                <div className="card p-8 bg-white dark:bg-neutral-900 border-none shadow-xl shadow-sandalwood-100 dark:shadow-neutral-950/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-saffron-50 dark:bg-saffron-900/20 flex items-center justify-center text-saffron-500">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Publish New Lesson</h3>
                      <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">Direct File Upload</p>
                    </div>
                  </div>

                  <form onSubmit={handleUpload} className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Video Title</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.title} 
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        className="input-field" 
                        placeholder="e.g., The Value of Patience" 
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Description</label>
                      <textarea 
                        required 
                        value={formData.description} 
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        className="input-field min-h-[100px]" 
                        placeholder="Explain the lesson behind this video..." 
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1 flex items-center gap-2">
                           <FileVideo className="w-3 h-3" /> Select Video File
                        </label>
                        <div className="relative group">
                           <input 
                             type="file" 
                             accept="video/*"
                             required 
                             onChange={e => setVideoFile(e.target.files[0])}
                             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                           />
                           <div className="input-field !py-3 bg-sandalwood-50 dark:bg-neutral-800 flex items-center justify-between text-xs font-medium text-neutral-500">
                              <span>{videoFile ? videoFile.name : "Choose MP4/WebM..."}</span>
                              <Upload className="w-4 h-4 text-saffron-500" />
                           </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1 flex items-center gap-2">
                           <ImageIcon className="w-3 h-3" /> Select Thumbnail
                        </label>
                        <div className="relative group">
                           <input 
                             type="file" 
                             accept="image/*"
                             onChange={e => setThumbnailFile(e.target.files[0])}
                             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                           />
                           <div className="input-field !py-3 bg-sandalwood-50 dark:bg-neutral-800 flex items-center justify-between text-xs font-medium text-neutral-500">
                              <span>{thumbnailFile ? thumbnailFile.name : "Choose Image (Optional)"}</span>
                              <Upload className="w-4 h-4 text-forest-500" />
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                       <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Age Category</label>
                         <select 
                           required 
                           value={formData.ageGroup} 
                           onChange={e => setFormData({...formData, ageGroup: e.target.value})}
                           className="input-field !py-3.5 appearance-none"
                         >
                           <option value="4-6">4–6 years (Little Explorers)</option>
                           <option value="7-9">7–9 years (Young Learners)</option>
                           <option value="10-12">10–12 years (Creative Thinkers)</option>
                           <option value="13+">13+ years (Future Leaders)</option>
                           <option value="all">Universal (All Ages)</option>
                         </select>
                       </div>

                       <div className="pt-2">
                         <button 
                           type="submit" 
                           disabled={formLoading}
                           className="btn-primary w-full !py-4 flex items-center justify-center gap-2 shadow-lg shadow-saffron-100"
                         >
                           {formLoading ? (
                             <>
                               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                               Uploading to Server...
                             </>
                           ) : (
                             <>
                               <Plus className="w-5 h-5" />
                               Publish Lesson
                             </>
                           )}
                         </button>
                       </div>
                    </div>

                    {message.text && (
                      <div className={`md:col-span-2 flex items-center gap-3 p-4 rounded-xl text-xs font-bold animate-fade-in ${
                        message.type === 'success' ? 'bg-forest-50 text-forest-700 dark:bg-forest-900/20' : 'bg-red-50 text-red-700 dark:bg-red-900/20'
                      }`}>
                        {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {message.text}
                      </div>
                    )}
                  </form>
                </div>

                <div className="card bg-white dark:bg-neutral-900 border-none shadow-xl overflow-hidden">
                   <div className="p-6 border-b border-sandalwood-50 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-neutral-900 dark:text-white">Active Content Feed</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mt-1">{filteredContent.length} Items Found</p>
                      </div>
                      <div className="relative group max-w-sm w-full">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-saffron-500 transition-colors" />
                         <input 
                           type="text" 
                           placeholder="Search title or description..." 
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="input-field !py-2.5 !pl-10 !text-xs bg-sandalwood-50 dark:bg-neutral-800 border-none"
                         />
                      </div>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                         <thead className="bg-sandalwood-50/50 dark:bg-neutral-800/50 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                            <tr>
                               <th className="px-6 py-4">Preview</th>
                               <th className="px-6 py-4">Title</th>
                               <th className="px-6 py-4">Age Group</th>
                               <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-sandalwood-50 dark:divide-neutral-800">
                            {filteredContent.map(item => (
                               <tr key={item._id} className="hover:bg-sandalwood-50/30 dark:hover:bg-neutral-800/30 transition-colors group">
                                  <td className="px-6 py-4">
                                     <div className="w-20 aspect-video rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                                        <img src={item.thumbnailUrl} className="w-full h-full object-cover" alt="" />
                                     </div>
                                  </td>
                                  <td className="px-6 py-4">
                                     <p className="font-bold text-neutral-900 dark:text-white text-sm">{item.title}</p>
                                  </td>
                                  <td className="px-6 py-4">
                                     <span className="text-[10px] font-bold px-2 py-1 bg-sandalwood-100 dark:bg-neutral-800 rounded text-sandalwood-600 dark:text-neutral-400">{item.ageGroup}</span>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                     <div className="flex justify-end gap-2">
                                        <a href={item.videoUrl} target="_blank" className="p-2 text-neutral-400 hover:text-saffron-500 transition-colors"><ExternalLink className="w-4 h-4" /></a>
                                        <button 
                                          type="button"
                                          onClick={(e) => handleDeleteContent(e, item._id)}
                                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${confirmDeleteId === item._id ? "bg-red-500 text-white" : "text-neutral-400 hover:text-red-500"}`}
                                        >
                                          {confirmDeleteId === item._id ? <><ShieldAlert className="w-3 h-3" /> Sure?</> : <Trash2 className="w-4 h-4" />}
                                        </button>
                                     </div>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
              </div>
            )}

            {(activeTab === 'parents' || activeTab === 'children') && (
               <div className="card bg-white dark:bg-neutral-900 border-none shadow-xl overflow-hidden">
                  <div className="p-6 border-b border-sandalwood-50 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-forest-50 dark:bg-forest-900/20 flex items-center justify-center text-forest-600">
                           {activeTab === 'parents' ? <Users className="w-6 h-6" /> : <Baby className="w-6 h-6" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-neutral-900 dark:text-white">
                            {activeTab === 'parents' ? 'Guardian Directory' : 'Student Accounts'}
                          </h4>
                          <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mt-0.5">{(activeTab === 'parents' ? filteredParents : filteredChildren).length} Verified Records</p>
                        </div>
                      </div>
                      
                      <div className="flex-1 max-w-md relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-saffron-500 transition-colors" />
                        <input 
                           type="text" 
                           placeholder={activeTab === 'parents' ? "Search by name, email, or ID..." : "Search students or guardian ID..."}
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="input-field !py-3 !pl-12 !text-xs bg-sandalwood-50 dark:bg-neutral-800 border-none shadow-inner"
                        />
                        {searchTerm && (
                           <button type="button" onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-red-500 transition-colors">
                              <X className="w-3 h-3" />
                           </button>
                        )}
                      </div>
                  </div>
                  <div className="overflow-x-auto">
                      <table className="w-full text-left">
                         <thead className="bg-sandalwood-50/50 dark:bg-neutral-800/50 text-[10px] font-black uppercase tracking-widest text-neutral-400 border-b border-sandalwood-100 dark:border-neutral-800">
                            <tr>
                               <th className="px-6 py-4">System ID</th>
                               <th className="px-6 py-4">Name</th>
                               <th className="px-6 py-4">{activeTab === 'parents' ? 'Email & Phone' : 'Guardian Link'}</th>
                               <th className="px-6 py-4">{activeTab === 'parents' ? 'Joined' : 'XP Points'}</th>
                               <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-sandalwood-50 dark:divide-neutral-800">
                            {(activeTab === 'parents' ? filteredParents : filteredChildren).map(u => (
                               <tr key={u.id} className="hover:bg-sandalwood-50/30 dark:hover:bg-neutral-800/30 transition-all group">
                                  <td className="px-6 py-4">
                                     <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-neutral-400 group-hover:text-saffron-500 transition-colors bg-white/40 dark:bg-black/10 px-2 py-1 rounded w-fit">
                                        <Fingerprint className="w-3 h-3" />
                                        {u.id}
                                     </div>
                                  </td>
                                  <td className="px-6 py-4">
                                     <p className="font-bold text-neutral-900 dark:text-white text-sm">{u.name}</p>
                                  </td>
                                  <td className="px-6 py-4">
                                     {activeTab === 'parents' ? (
                                        <div className="space-y-1">
                                           <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">{u.email}</p>
                                           <p className="text-[10px] font-bold text-neutral-400">{u.phone || 'No phone'}</p>
                                        </div>
                                     ) : (
                                        <div className="flex items-center gap-2 text-[10px] font-mono bg-sandalwood-50 dark:bg-neutral-800 px-2.5 py-1 rounded-lg border border-sandalwood-100 dark:border-neutral-700 w-fit">
                                           <Users className="w-3 h-3 text-neutral-400" />
                                           <span className="font-black text-neutral-500">{u.parentId || 'N/A'}</span>
                                        </div>
                                     )}
                                  </td>
                                  <td className="px-6 py-4">
                                     {activeTab === 'parents' ? (
                                        <p className="text-xs font-medium text-neutral-500">
                                           {new Date(u.createdAt).toLocaleDateString()}
                                        </p>
                                     ) : (
                                        <p className="text-sm font-black text-forest-600">{u.xp} pts</p>
                                     )}
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                     <button 
                                        type="button"
                                        onClick={(e) => handleDeleteUser(e, u.id, activeTab === 'parents' ? 'parent' : 'child')}
                                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all shadow-sm ${confirmDeleteId === u.id ? "bg-red-500 text-white scale-105" : "bg-neutral-50 dark:bg-neutral-800 text-neutral-400 hover:text-red-500 hover:bg-white"}`}
                                        title={confirmDeleteId === u.id ? "Click again to delete" : "Delete Account"}
                                     >
                                        {confirmDeleteId === u.id ? (
                                           <>
                                              <AlertTriangle className="w-4 h-4 animate-pulse" />
                                              <span className="text-[10px] uppercase">Confirm?</span>
                                           </>
                                        ) : (
                                           <Trash2 className="w-5 h-5" />
                                        )}
                                     </button>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                  </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
