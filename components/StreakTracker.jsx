"use client";

import { Flame, TrendingUp } from "lucide-react";

export default function StreakTracker({ streak = 0 }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      label: d.toLocaleDateString("en", { weekday: "short" }).slice(0, 2),
      active: i >= 7 - streak && streak > 0,
      isToday: i === 6,
    };
  });

  return (
    <div className="card p-8 bg-white dark:bg-calm-900 border-none shadow-xl shadow-calm-100/50 dark:shadow-calm-950/50">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-saffron-50 dark:bg-saffron-900/20 flex items-center justify-center text-saffron-500">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-bold text-calm-900 dark:text-white leading-tight">Daily Spark</h3>
            <p className="text-[10px] uppercase font-bold text-calm-400 tracking-widest">Growth Streak</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-black text-saffron-500 dark:text-saffron-400">{streak}</span>
          <span className="text-[10px] font-bold text-calm-400 uppercase tracking-tighter">Day Streak</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 px-1">
        {days.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-1">
            <div
              className={`w-full aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                day.active
                  ? "bg-gradient-to-br from-saffron-400 to-saffron-500 text-white shadow-lg shadow-saffron-500/30"
                  : day.isToday
                  ? "bg-calm-50 dark:bg-calm-800 border-2 border-dashed border-calm-200 dark:border-calm-700 text-calm-300"
                  : "bg-calm-50 dark:bg-calm-800/40 text-calm-200 dark:text-calm-700"
              }`}
            >
              {day.active ? <Flame className="w-4 h-4 fill-current" /> : "·"}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-tighter ${day.isToday ? "text-saffron-500 dark:text-saffron-400" : "text-calm-400 dark:text-calm-600"}`}>
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
