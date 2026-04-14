export function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes.toString().padStart(2, "0")}m ${seconds
      .toString()
      .padStart(2, "0")}s`;
  }
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function isTimeLimitExceeded(currentMinutes, limitMinutes) {
  return currentMinutes >= limitMinutes;
}

export function getTimePercentage(currentMinutes, limitMinutes) {
  if (limitMinutes === 0) return 0;
  return Math.min((currentMinutes / limitMinutes) * 100, 100);
}

export function getTimeStatus(currentMinutes, limitMinutes) {
  const percentage = getTimePercentage(currentMinutes, limitMinutes);
  if (percentage >= 100) return { status: "exceeded", color: "red", message: "Time limit reached!" };
  if (percentage >= 80) return { status: "warning", color: "amber", message: "Almost at time limit" };
  if (percentage >= 50) return { status: "moderate", color: "yellow", message: "Halfway through" };
  return { status: "good", color: "green", message: "Plenty of time left" };
}

export function getOfflineActivities(ageGroup) {
  const activities = {
    "4-6": [
      "🎨 Draw your favorite animal and tell a story about it",
      "🌿 Go for a nature walk and collect 5 leaves",
      "🧩 Build something creative with blocks",
      "📖 Ask a family member to tell you a folk tale",
      "🎵 Learn a new action song",
    ],
    "7-9": [
      "📝 Write a short story about kindness",
      "🌱 Plant a seed and start a garden journal",
      "🎭 Act out a scene from your favorite story",
      "🧮 Create a math puzzle for your friend",
      "🗺️ Draw a map of your neighborhood",
    ],
    "10-12": [
      "📓 Start a gratitude journal — write 5 things you're thankful for",
      "🎨 Design a poster about an important value",
      "📚 Read a chapter from a biography of a great leader",
      "🧪 Try a simple science experiment at home",
      "✍️ Write a letter to your future self",
    ],
    "13-16": [
      "📝 Write a reflection on a philosophical question",
      "🎯 Set 3 goals for this month and plan steps to achieve them",
      "📖 Read an article about a global issue and summarize it",
      "🤝 Volunteer for a community activity",
      "🧘 Practice 10 minutes of mindfulness meditation",
    ],
  };
  return activities[ageGroup] || activities["7-9"];
}
