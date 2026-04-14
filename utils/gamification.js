export const BADGES = [
  { id: "first_login", name: "First Steps", icon: "👣", description: "Logged in for the first time", xpRequired: 0 },
  { id: "xp_50", name: "Rising Star", icon: "⭐", description: "Earned 50 XP", xpRequired: 50 },
  { id: "xp_100", name: "Knowledge Seeker", icon: "🔍", description: "Earned 100 XP", xpRequired: 100 },
  { id: "xp_250", name: "Wisdom Explorer", icon: "🧭", description: "Earned 250 XP", xpRequired: 250 },
  { id: "xp_500", name: "Scholar", icon: "🎓", description: "Earned 500 XP", xpRequired: 500 },
  { id: "xp_1000", name: "Master Mind", icon: "🧠", description: "Earned 1000 XP", xpRequired: 1000 },
  { id: "streak_3", name: "Consistent Learner", icon: "🔥", description: "3-day streak", streakRequired: 3 },
  { id: "streak_7", name: "Week Warrior", icon: "💪", description: "7-day streak", streakRequired: 7 },
  { id: "streak_30", name: "Monthly Champion", icon: "🏆", description: "30-day streak", streakRequired: 30 },
  { id: "stories_5", name: "Story Lover", icon: "📖", description: "Completed 5 stories", storiesRequired: 5 },
  { id: "tasks_10", name: "Task Master", icon: "✅", description: "Completed 10 tasks", tasksRequired: 10 },
  { id: "focus_mode", name: "Deep Focus", icon: "🎯", description: "Used Focus Mode", special: true },
];

export function calculateLevel(xp) {
  return Math.floor(xp / 100) + 1;
}

export function xpForNextLevel(xp) {
  const currentLevel = calculateLevel(xp);
  return currentLevel * 100;
}

export function xpProgress(xp) {
  const nextLevelXP = xpForNextLevel(xp);
  const currentLevelXP = (calculateLevel(xp) - 1) * 100;
  return ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
}

export function checkNewBadges(child) {
  const earnedBadgeIds = child.badges.map((b) => b.id);
  const newBadges = [];

  for (const badge of BADGES) {
    if (earnedBadgeIds.includes(badge.id)) continue;

    if (badge.xpRequired !== undefined && child.xp >= badge.xpRequired) {
      newBadges.push(badge);
    }
    if (badge.streakRequired && child.streak >= badge.streakRequired) {
      newBadges.push(badge);
    }
    if (badge.storiesRequired && child.progress?.storiesCompleted >= badge.storiesRequired) {
      newBadges.push(badge);
    }
    if (badge.tasksRequired && child.progress?.tasksCompleted >= badge.tasksRequired) {
      newBadges.push(badge);
    }
    if (badge.id === "focus_mode" && child.focusModeEnabled) {
      newBadges.push(badge);
    }
  }

  return newBadges;
}

export function getLevelTitle(level) {
  if (level <= 2) return "Beginner";
  if (level <= 5) return "Explorer";
  if (level <= 8) return "Achiever";
  if (level <= 12) return "Scholar";
  if (level <= 16) return "Master";
  return "Grandmaster";
}
