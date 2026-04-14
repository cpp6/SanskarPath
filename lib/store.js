import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  activeChild: null,
  isLoading: true,

  initialize: () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("sp_token");
    const user = localStorage.getItem("sp_user");
    const activeChild = localStorage.getItem("sp_active_child");
    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
        activeChild: activeChild ? JSON.parse(activeChild) : null,
        isLoading: false,
      });
    } else {
      set({ isLoading: false });
    }
  },

  login: (token, user) => {
    localStorage.setItem("sp_token", token);
    localStorage.setItem("sp_user", JSON.stringify(user));
    set({ token, user, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem("sp_token");
    localStorage.removeItem("sp_user");
    localStorage.removeItem("sp_active_child");
    set({ token: null, user: null, activeChild: null });
  },

  setActiveChild: (child) => {
    localStorage.setItem("sp_active_child", JSON.stringify(child));
    set({ activeChild: child });
  },

  getHeaders: () => {
    const token = get().token;
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  },
}));

export const useScreenTimeStore = create((set, get) => ({
  remainingTime: 0,
  isActive: false,
  timerId: null,

  startTimer: (limitMinutes) => {
    const existing = get().timerId;
    if (existing) clearInterval(existing);

    set({ remainingTime: limitMinutes * 60, isActive: true });

    const id = setInterval(() => {
      const current = get().remainingTime;
      if (current <= 0) {
        clearInterval(id);
        set({ isActive: false, remainingTime: 0, timerId: null });
        return;
      }
      set({ remainingTime: current - 1 });
    }, 1000);

    set({ timerId: id });
  },

  stopTimer: () => {
    const id = get().timerId;
    if (id) clearInterval(id);
    set({ isActive: false, timerId: null });
  },

  resetTimer: () => {
    const id = get().timerId;
    if (id) clearInterval(id);
    set({ remainingTime: 0, isActive: false, timerId: null });
  },
}));
