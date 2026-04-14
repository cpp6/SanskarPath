"use client";

import { useState } from "react";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { getOfflineActivities } from "@/utils/screenTime";

export default function FocusMode({ ageGroup = "7-9", enabled = false, onToggle }) {
  const [isEnabled, setIsEnabled] = useState(enabled);
  const activities = getOfflineActivities(ageGroup);

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    if (onToggle) onToggle(newState);
  };

  if (isEnabled) {
    return (
      <div className="focus-overlay animate-fade-in">
        <div className="max-w-lg mx-auto p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30">
            <Leaf className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-3">
            Focus Mode Active
          </h2>
          <p className="text-calm-300 mb-8 text-lg">
            Take a break from the screen. Try one of these activities:
          </p>

          <div className="space-y-3 mb-8">
            {activities.map((activity, i) => (
              <div
                key={i}
                className="glass p-4 text-left text-white/90 text-sm hover:bg-white/20 transition-colors cursor-default rounded-2xl"
              >
                {activity}
              </div>
            ))}
          </div>

          <button
            onClick={handleToggle}
            className="px-8 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all font-bold backdrop-blur-sm"
          >
            <EyeOff className="w-4 h-4 inline mr-2" />
            Exit Focus Mode
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className="card p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-all w-full text-left bg-white dark:bg-calm-900 border-none shadow-lg shadow-calm-100/50 dark:shadow-calm-950/50"
    >
      <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
        <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
      </div>
      <div>
        <p className="font-bold text-calm-800 dark:text-white text-sm">Focus Mode</p>
        <p className="text-xs text-calm-500 dark:text-calm-400">Take a screen break with offline activities</p>
      </div>
    </button>
  );
}
