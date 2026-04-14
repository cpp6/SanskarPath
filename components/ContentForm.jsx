"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function ContentForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "story",
    ageGroup: "all",
    xpReward: 10,
    icon: "📖",
  });
  const [loading, setLoading] = useState(false);

  const icons = ["📖", "🎬", "✅", "💬", "🎨", "🧩", "🌍", "🎯", "📝", "🧘", "🏹", "💡"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (onSubmit) await onSubmit(form);
    setLoading(false);
    setForm({ title: "", description: "", category: "story", ageGroup: "all", xpReward: 10, icon: "📖" });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-calm-800 flex items-center gap-2">
          <Plus className="w-5 h-5 text-saffron-500" />
          Add Content
        </h3>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            <X className="w-5 h-5 text-calm-400" />
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-calm-700 mb-1">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="input-field"
          placeholder="Enter content title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-calm-700 mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="input-field min-h-[100px] resize-none"
          placeholder="Describe the content..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-calm-700 mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="input-field"
          >
            <option value="story">Story</option>
            <option value="video">Video</option>
            <option value="task">Task</option>
            <option value="activity">Activity</option>
            <option value="quote">Quote</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-calm-700 mb-1">Age Group</label>
          <select
            value={form.ageGroup}
            onChange={(e) => setForm({ ...form, ageGroup: e.target.value })}
            className="input-field"
          >
            <option value="all">All Ages</option>
            <option value="4-6">4-6 years</option>
            <option value="7-9">7-9 years</option>
            <option value="10-12">10-12 years</option>
            <option value="13-16">13-16 years</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-calm-700 mb-1">XP Reward</label>
        <input
          type="number"
          min={5}
          max={100}
          value={form.xpReward}
          onChange={(e) => setForm({ ...form, xpReward: Number(e.target.value) })}
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-calm-700 mb-2">Icon</label>
        <div className="flex flex-wrap gap-2">
          {icons.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => setForm({ ...form, icon })}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                form.icon === icon
                  ? "bg-saffron-100 ring-2 ring-saffron-400 scale-110"
                  : "bg-calm-50 hover:bg-calm-100"
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Content"}
      </button>
    </form>
  );
}
