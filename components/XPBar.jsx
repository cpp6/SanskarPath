"use client";

import { Star } from "lucide-react";
import { calculateLevel } from "@/utils/gamification";

export default function XPBar({ xp = 0 }) {
  const level = calculateLevel(xp);
  const xpInCurrentLevel = xp % 1000;
  const progress = (xpInCurrentLevel / 1000) * 100;

  return (
    <div className="card p-8 bg-white dark:bg-calm-900 border-none shadow-xl shadow-calm-100/50 dark:shadow-calm-950/50 group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-saffron-50 dark:bg-saffron-900/20 flex items-center justify-center text-saffron-500 animate-pulse">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-bold text-calm-900 dark:text-white leading-tight">Wisdom Level {level}</h3>
            <p className="text-[10px] uppercase font-bold text-calm-400 tracking-widest">Experience Points</p>
          </div>
        </div>
        <span className="text-sm font-black text-saffron-500 dark:text-saffron-400">{xp} <span className="text-xs font-bold text-calm-400">XP</span></span>
      </div>

      <div className="space-y-3">
        <div className="h-4 bg-calm-50 dark:bg-calm-800 rounded-full overflow-hidden p-1 border dark:border-calm-700">
          <div 
            className="h-full bg-gradient-to-r from-saffron-400 to-saffron-500 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-saffron-500/20 dark:shadow-saffron-500/40 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-shimmer" />
          </div>
        </div>
        <div className="flex justify-between text-[10px] font-bold text-calm-400 uppercase tracking-widest">
          <span>{Math.round(progress)}% progress</span>
          <span>Next level in {1000 - xpInCurrentLevel} XP</span>
        </div>
      </div>
    </div>
  );
}
