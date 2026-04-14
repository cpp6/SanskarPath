"use client";

import { useEffect, useState } from "react";
import { useScreenTimeStore } from "@/lib/store";
import { formatTime } from "@/utils/screenTime";
import { Clock, AlertTriangle, Pause, Play, Shield } from "lucide-react";

export default function ScreenTimer({ limitMinutes = 60, onTimeUp }) {
  const { remainingTime, isActive, startTimer, stopTimer } = useScreenTimeStore();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started && limitMinutes > 0) {
      startTimer(limitMinutes);
      setStarted(true);
    }
  }, [limitMinutes]);

  useEffect(() => {
    if (started && remainingTime <= 0 && !isActive) {
      if (onTimeUp) onTimeUp();
    }
  }, [remainingTime, isActive, started]);

  const percentage = limitMinutes > 0 ? (remainingTime / (limitMinutes * 60)) * 100 : 0;
  const isWarning = percentage <= 20 && percentage > 0;
  const isExpired = remainingTime <= 0 && started;

  return (
    <div
      className={`card p-8 border-none shadow-xl transition-all duration-500 bg-white dark:bg-calm-900 shadow-calm-100/50 dark:shadow-calm-950/50 ${
        isExpired
          ? "ring-2 ring-red-500/20"
          : isWarning
          ? "ring-2 ring-amber-500/20"
          : ""
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
              isExpired
                ? "bg-red-50 dark:bg-red-900/20 text-red-500"
                : isWarning
                ? "bg-amber-50 dark:bg-amber-900/20 text-amber-500"
                : "bg-sky-50 dark:bg-sky-900/20 text-sky-500"
            }`}
          >
            {isExpired ? (
              <AlertTriangle className="w-6 h-6" />
            ) : (
              <Clock className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-calm-900 dark:text-white leading-tight">Focus Timer</h3>
            <p className="text-[10px] uppercase font-bold text-calm-400 tracking-widest">Balanced Usage</p>
          </div>
        </div>

        <button
          onClick={isActive ? stopTimer : () => startTimer(Math.ceil(remainingTime / 60) || limitMinutes)}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            isActive 
              ? "bg-calm-50 dark:bg-calm-800 text-calm-600 dark:text-calm-400" 
              : "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
          }`}
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
        </button>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <span
            className={`text-4xl font-black tracking-tighter transition-colors duration-500 ${
              isExpired
                ? "text-red-500"
                : isWarning
                ? "text-amber-500"
                : "text-calm-900 dark:text-white"
            }`}
          >
            {isExpired ? "00:00" : formatTime(remainingTime)}
          </span>
          <p className="text-[10px] font-bold text-calm-400 uppercase tracking-widest mt-1">Remaining</p>
        </div>

        <div className="space-y-3">
          <div className="h-3 bg-calm-50 dark:bg-calm-800 rounded-full overflow-hidden p-0.5 border dark:border-calm-700">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out relative ${
                isExpired
                  ? "bg-red-500 shadow-lg shadow-red-500/20"
                  : isWarning
                  ? "bg-amber-500 shadow-lg shadow-amber-500/20"
                  : "bg-gradient-to-r from-sky-400 to-sky-500 shadow-lg shadow-sky-500/20"
              }`}
              style={{ width: `${Math.max(percentage, 0)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-shimmer" />
            </div>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-calm-400 uppercase tracking-widest">
            <span>{isExpired ? "Rest Mode" : "Focus Mode"}</span>
            <span>{Math.round(percentage)}% Left</span>
          </div>
        </div>
      </div>

      {isExpired && (
        <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-start gap-3">
          <Shield className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-600 dark:text-red-400 font-medium leading-relaxed">
            Character grows in stillness. Time for a mindful break offline.🌿
          </p>
        </div>
      )}
    </div>
  );
}
