"use client";

import { getDailyQuote } from "@/utils/quotes";
import { Quote, Sparkles } from "lucide-react";

export default function DailyQuote() {
  const quote = getDailyQuote();

  return (
    <div className="card p-8 bg-white dark:bg-calm-900 border-none shadow-xl shadow-calm-100/50 dark:shadow-calm-950/50 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform duration-700">
        <Quote className="w-24 h-24 text-calm-900 dark:text-white" />
      </div>
      
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-saffron-50 dark:bg-saffron-900/20 flex items-center justify-center text-saffron-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-calm-400">Daily Wisdom</h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-xl md:text-2xl font-display font-medium text-calm-900 dark:text-white leading-relaxed italic">
            &ldquo;{quote.text}&rdquo;
          </p>
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-saffron-500/30" />
            <p className="text-sm font-bold text-saffron-500 tracking-wide">
              {quote.author}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
