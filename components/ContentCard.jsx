"use client";

import { useAuthStore } from "@/lib/store";
import { 
  BookOpen, Video, CheckSquare, Play, 
  CheckCircle, Lock, Sparkles, ArrowRight
} from "lucide-react";

export default function ContentCard({ content, isCompleted, isLocked, onComplete }) {
  const getIcon = (category) => {
    switch (category) {
      case "story": return <BookOpen className="w-5 h-5" />;
      case "video": return <Video className="w-5 h-5" />;
      case "task": return <CheckSquare className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "story": return "text-sky-500 bg-sky-50 dark:bg-sky-900/20";
      case "video": return "text-saffron-500 bg-saffron-50 dark:bg-saffron-900/20";
      case "task": return "text-green-500 bg-green-50 dark:bg-green-900/20";
      default: return "text-saffron-500 bg-saffron-50 dark:bg-saffron-900/20";
    }
  };

  return (
    <div className={`card p-6 flex flex-col md:flex-row items-center gap-6 group transition-all duration-500 border border-calm-100 dark:border-calm-800 bg-white dark:bg-calm-950 ${
      isCompleted ? "opacity-75 grayscale-[0.5]" : ""
    } ${isLocked ? "pointer-events-none opacity-50" : ""}`}>
      
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 ${getCategoryColor(content.category)}`}>
        {getIcon(content.category)}
      </div>

      <div className="flex-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-calm-400">
            {content.category}
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase">
              <CheckCircle className="w-3 h-3" /> Completed
            </span>
          )}
        </div>
        <h3 className="font-bold text-xl text-calm-900 dark:text-white mb-2 leading-tight group-hover:text-saffron-500 transition-colors">
          {content.title}
        </h3>
        <p className="text-sm text-calm-500 dark:text-calm-400 line-clamp-2 max-w-xl">
          {content.description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-center md:text-right hidden sm:block">
          <p className="text-lg font-black text-saffron-500">+{content.xpReward}</p>
          <p className="text-[10px] font-bold text-calm-400 uppercase tracking-widest">Wisdom XP</p>
        </div>
        
        <button
          onClick={() => !isCompleted && onComplete && onComplete(content._id, content.xpReward)}
          disabled={isCompleted || isLocked}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
            isCompleted 
              ? "bg-calm-50 dark:bg-calm-900 text-calm-400" 
              : "bg-saffron-500 text-white hover:bg-saffron-600 hover:shadow-lg hover:shadow-saffron-500/30"
          }`}
        >
          {isCompleted ? (
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Done</span>
          ) : (
            content.category === "video" ? <><Play className="w-4 h-4 fill-current" /> Watch</> : <><ArrowRight className="w-4 h-4" /> Start</>
          )}
        </button>
      </div>
    </div>
  );
}
