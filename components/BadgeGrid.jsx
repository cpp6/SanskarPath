"use client";

import { BADGES } from "@/utils/gamification";
import { Award } from "lucide-react";

export default function BadgeGrid({ earnedBadges = [] }) {
  const earnedIds = earnedBadges.map((b) => b.id);

  return (
    <div className="card p-8 bg-white dark:bg-calm-900 border-none shadow-xl shadow-calm-100/50 dark:shadow-calm-950/50">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-saffron-50 dark:bg-saffron-900/20 flex items-center justify-center text-saffron-500">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-calm-900 dark:text-white leading-tight">Value Badges</h3>
            <p className="text-[10px] uppercase font-bold text-calm-400 tracking-widest">Achievements</p>
          </div>
        </div>
        <span className="text-xs font-black bg-saffron-500 text-white px-3 py-1 rounded-full">
          {earnedBadges.length}/{BADGES.length}
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4">
        {BADGES.map((badge) => {
          const isEarned = earnedIds.includes(badge.id);
          return (
            <div
              key={badge.id}
              className={`flex flex-col items-center p-4 rounded-2xl transition-all duration-500 relative group ${
                isEarned
                  ? "bg-saffron-50/50 dark:bg-saffron-900/20 hover:scale-105"
                  : "bg-calm-50 dark:bg-calm-800/30 opacity-40 grayscale"
              }`}
              title={isEarned ? `${badge.name}: ${badge.description}` : `Locked: ${badge.description}`}
            >
              <span className={`text-3xl mb-2 transition-transform ${isEarned ? "group-hover:rotate-12" : ""}`}>{badge.icon}</span>
              <span className="text-[10px] text-calm-900 dark:text-white text-center leading-tight font-black uppercase tracking-tighter">
                {badge.name}
              </span>
              {isEarned && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-calm-900" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
