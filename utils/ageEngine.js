export function getContentForAge(ageGroup) {
  const categories = {
    "4-6": {
      primary: ["story"],
      secondary: ["activity"],
      label: "Moral Stories & Basic Values",
      description: "Simple moral stories, basic manners, respect for elders",
      themes: ["kindness", "sharing", "honesty", "respect", "gratitude"],
    },
    "7-9": {
      primary: ["story", "task"],
      secondary: ["video", "activity"],
      label: "Ethics, History & Good Habits",
      description: "Ethical reasoning, historical tales, building good habits",
      themes: ["ethics", "history", "discipline", "teamwork", "courage"],
    },
    "10-12": {
      primary: ["video", "task"],
      secondary: ["story", "activity"],
      label: "Creativity, Language & Reasoning",
      description: "Creative thinking, language skills, logical reasoning",
      themes: ["creativity", "language", "reasoning", "leadership", "empathy"],
    },
    "13-16": {
      primary: ["video", "task", "story"],
      secondary: ["activity"],
      label: "Life Skills & Philosophy",
      description: "Life skills, philosophical thinking, self-improvement",
      themes: [
        "philosophy",
        "life-skills",
        "self-improvement",
        "mindfulness",
        "responsibility",
      ],
    },
  };

  return categories[ageGroup] || categories["7-9"];
}

export function filterContentByAge(contentList, ageGroup) {
  const config = getContentForAge(ageGroup);
  const allCategories = [...config.primary, ...config.secondary];

  return contentList.filter(
    (item) =>
      (item.ageGroup === ageGroup || item.ageGroup === "all") &&
      allCategories.includes(item.category)
  );
}

export function getAgeGroupLabel(ageGroup) {
  const labels = {
    "4-6": "Little Explorers (4-6 years)",
    "7-9": "Young Learners (7-9 years)",
    "10-12": "Creative Thinkers (10-12 years)",
    "13-16": "Future Leaders (13-16 years)",
  };
  return labels[ageGroup] || ageGroup;
}

export function getAgeGroupEmoji(ageGroup) {
  const emojis = {
    "4-6": "🌱",
    "7-9": "🌿",
    "10-12": "🌳",
    "13-16": "🏔️",
  };
  return emojis[ageGroup] || "📚";
}
