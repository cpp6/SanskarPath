"use client";

import { useState, useEffect } from "react";
import { Bell, CheckCircle, AlertTriangle, X } from "lucide-react";

export default function NotificationBell({ children: childrenList = [] }) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const notifs = [];

    childrenList.forEach((child) => {
      if (child.currentScreenTime >= child.screenTimeLimit) {
        notifs.push({
          id: `time-${child._id}`,
          type: "warning",
          message: `${child.name}'s screen time limit has been reached`,
          icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
        });
      }

      if (child.progress?.dailyGoalMet) {
        notifs.push({
          id: `goal-${child._id}`,
          type: "success",
          message: `${child.name} completed today's daily goal! 🎉`,
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
        });
      }

      if (child.streak >= 7) {
        notifs.push({
          id: `streak-${child._id}`,
          type: "info",
          message: `${child.name} has a ${child.streak}-day streak!`,
          icon: <span className="text-base">🔥</span>,
        });
      }
    });

    setNotifications(notifs);
  }, [childrenList]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2.5 rounded-xl bg-calm-50 dark:bg-calm-800 hover:bg-calm-100 dark:hover:bg-calm-700 transition-colors"
      >
        <Bell className="w-5 h-5 text-calm-600 dark:text-calm-400" />
        {notifications.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold animate-pulse">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-80 bg-white dark:bg-calm-900 rounded-2xl shadow-2xl border border-calm-100 dark:border-calm-800 p-2 animate-scale-in z-50">
          <div className="flex items-center justify-between px-3 py-2">
            <h4 className="font-bold text-calm-900 dark:text-white text-sm">Notifications</h4>
            <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-calm-50 dark:hover:bg-calm-800 transition-colors">
              <X className="w-4 h-4 text-calm-400" />
            </button>
          </div>
          {notifications.length === 0 ? (
            <p className="px-3 py-4 text-sm text-calm-400 text-center">All clear — no notifications.</p>
          ) : (
            <div className="space-y-1">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-calm-50 dark:hover:bg-calm-800/50 transition-colors"
                >
                  <div className="mt-0.5 flex-shrink-0">{n.icon}</div>
                  <p className="text-sm text-calm-700 dark:text-calm-300">{n.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
