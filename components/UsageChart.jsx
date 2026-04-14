"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/store";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { BarChart2, Activity } from "lucide-react";

export default function UsageChart({ childId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getHeaders } = useAuthStore();

  useEffect(() => {
    fetchData();
  }, [childId]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/screentime?childId=${childId}&days=7`, {
        headers: getHeaders(),
      });
      const json = await res.json();

      if (json.logs) {
        const chartData = json.logs.map((log) => ({
          date: new Date(log.date).toLocaleDateString("en", { weekday: "short" }),
          minutes: log.usageTime,
        }));
        setData(chartData);
      }
    } catch (error) {
      console.error("Failed to fetch usage data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card p-8 bg-white dark:bg-calm-900 border-none shadow-xl shadow-calm-100/50 dark:shadow-calm-950/50 flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-10 h-10 border-4 border-sky-100 dark:border-sky-900 border-t-sky-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="card p-8 bg-white dark:bg-calm-900 border-none shadow-xl shadow-calm-100/50 dark:shadow-calm-950/50">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center text-sky-500">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-calm-900 dark:text-white leading-tight">Usage Pulse</h3>
            <p className="text-[10px] uppercase font-bold text-calm-400 tracking-widest">Digital Habits</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-calm-400 bg-calm-50 dark:bg-calm-800 px-3 py-1.5 rounded-xl uppercase tracking-widest">
          <Activity className="w-3.5 h-3.5" /> 7D View
        </div>
      </div>

      {data.length > 0 ? (
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" className="dark:opacity-10" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 700 }} 
                dy={10}
              />
              <Tooltip
                cursor={{ fill: 'currentColor', opacity: 0.1, radius: 12 }}
                contentStyle={{
                  background: "var(--tooltip-bg, white)",
                  border: "none",
                  borderRadius: "16px",
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
                  padding: "16px",
                  color: "var(--tooltip-text, #0f172a)"
                }}
                itemStyle={{ fontSize: "14px", fontWeight: "900", color: "#0ea5e9" }}
                labelStyle={{ fontSize: "10px", fontWeight: "800", color: "#94a3b8", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.1em" }}
                formatter={(value) => [`${value} min`]}
              />
              <Bar
                dataKey="minutes"
                radius={[12, 12, 12, 12]}
                maxBarSize={32}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.minutes > 60 ? "#f97316" : "#0ea5e9"} 
                    className="transition-all duration-500 hover:opacity-100 opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-48 flex flex-col items-center justify-center gap-3 bg-calm-50/50 dark:bg-calm-800/30 rounded-3xl border border-dashed border-calm-100 dark:border-calm-800">
          <p className="text-sm font-bold text-calm-400">Monitoring digital harmony...</p>
          <p className="text-[10px] text-calm-300 uppercase tracking-[0.2em]">Data collection in progress</p>
        </div>
      )}
    </div>
  );
}
