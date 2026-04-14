"use client";

import { useState } from "react";
import { Check, X, Clock } from "lucide-react";

export default function ApprovalQueue({ items = [], onApprove, onReject }) {
  const [processing, setProcessing] = useState(null);

  const handleApprove = async (id) => {
    setProcessing(id);
    if (onApprove) await onApprove(id);
    setProcessing(null);
  };

  const handleReject = async (id) => {
    setProcessing(id);
    if (onReject) await onReject(id);
    setProcessing(null);
  };

  if (items.length === 0) {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-3">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <p className="text-calm-500">All caught up! No pending content.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item._id} className="card p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <span className="text-2xl mt-0.5">{item.icon || "📄"}</span>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-calm-800 truncate">{item.title}</h4>
                <p className="text-sm text-calm-500 line-clamp-1 mt-0.5">{item.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="badge-pill bg-sky-50 text-sky-600 text-xs">{item.category}</span>
                  <span className="badge-pill bg-calm-100 text-calm-600 text-xs">{item.ageGroup}</span>
                  <span className="flex items-center gap-1 text-xs text-calm-400">
                    <Clock className="w-3 h-3" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => handleApprove(item._id)}
                disabled={processing === item._id}
                className="p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors disabled:opacity-50"
                title="Approve"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleReject(item._id)}
                disabled={processing === item._id}
                className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                title="Reject"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
