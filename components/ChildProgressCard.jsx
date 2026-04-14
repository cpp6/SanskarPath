"use client";

import { calculateLevel, getLevelTitle } from "@/utils/gamification";
import { getAgeGroupLabel, getAgeGroupEmoji } from "@/utils/ageEngine";
import { ArrowRight } from "lucide-react";

export default function ChildProgressCard({ child, onClick }) {
  const level = calculateLevel(child.xp || 0);
  const title = getLevelTitle(level);

  return (
    <div
      className="card p-8 cursor-pointer group hover:border-saffron-200 dark:hover:border-saffron-900/50 bg-white dark:bg-calm-900 border-none shadow-xl shadow-calm-100/50 dark:shadow-calm-950/50 transition-all duration-500"
      onClick={() => onClick && onClick(child)}
    >
      <div className="flex items-center gap-5 mb-8">
        <div className="w-16 h-16 rounded-[1.5rem] bg-saffron-50 dark:bg-saffron-900/20 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-500">
          {getAgeGroupEmoji(child.ageGroup)}
        </div>
        <div>
          <h3 className="font-bold text-calm-900 dark:text-white text-xl leading-tight">{child.name}</h3>
          <p className="text-sm text-calm-500 dark:text-calm-400 font-medium">{getAgeGroupLabel(child.ageGroup)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-calm-50/50 dark:bg-calm-800/50 rounded-2xl p-4">
          <p className="text-[10px] uppercase font-bold text-calm-400 tracking-widest mb-1">Level</p>
          <p className="font-bold text-calm-900 dark:text-white">{level} <span className="text-[10px] font-medium text-calm-500 dark:text-calm-400 hidden sm:inline">({title})</span></p>
        </div>
        <div className="bg-calm-50/50 dark:bg-calm-800/50 rounded-2xl p-4">
          <p className="text-[10px] uppercase font-bold text-calm-400 tracking-widest mb-1">Current XP</p>
          <p className="font-bold text-saffron-500">{child.xp || 0}</p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between text-sm font-bold text-saffron-500 group-hover:text-saffron-600 transition-colors">
        <span>View Insights</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}
