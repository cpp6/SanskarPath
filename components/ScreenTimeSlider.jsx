"use client";

import { useState } from "react";
import { Clock, Save } from "lucide-react";

export default function ScreenTimeSlider({ currentLimit = 60, onSave }) {
  const [value, setValue] = useState(currentLimit);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    if (onSave) await onSave(value);
    setSaving(false);
  };

  const getLabel = (mins) => {
    if (mins < 60) return `${mins} minutes`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h} hour${h > 1 ? "s" : ""}`;
  };

  return (
    <div className="card p-8 bg-white dark:bg-calm-900 border-none shadow-xl shadow-calm-100/50 dark:shadow-calm-950/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-saffron-50 dark:bg-saffron-900/20 flex items-center justify-center text-saffron-500">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-calm-900 dark:text-white leading-tight">Daily Limit</h3>
          <p className="text-[10px] uppercase font-bold text-calm-400 tracking-widest">Time Management</p>
        </div>
      </div>

      <div className="mb-8 p-6 bg-calm-50/50 dark:bg-calm-800/50 rounded-2xl text-center">
        <span className="text-4xl font-black text-calm-900 dark:text-white">{getLabel(value)}</span>
      </div>

      <div className="space-y-6">
        <input
          type="range"
          min={15}
          max={180}
          step={15}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full h-2 bg-calm-100 dark:bg-calm-700 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-saffron-500
            [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-saffron-200
            [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110
            dark:[&::-webkit-slider-thumb]:shadow-saffron-500/30"
        />
        <div className="flex justify-between text-[10px] font-bold text-calm-400 uppercase tracking-widest">
          <span>15m</span>
          <span>90m</span>
          <span>3h</span>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving || value === currentLimit}
        className="btn-primary w-full mt-8 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:grayscale"
      >
        <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
        {saving ? "Updating..." : "Confirm Limit"}
      </button>
    </div>
  );
}
