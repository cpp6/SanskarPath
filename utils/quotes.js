const quotes = [
  { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "In a gentle way, you can shake the world.", author: "Mahatma Gandhi" },
  { text: "An eye for an eye only ends up making the whole world blind.", author: "Mahatma Gandhi" },
  { text: "The best way to find yourself is to lose yourself in the service of others.", author: "Mahatma Gandhi" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Kindness is a language which the deaf can hear and the blind can see.", author: "Mark Twain" },
  { text: "No act of kindness, no matter how small, is ever wasted.", author: "Aesop" },
  { text: "The mind is everything. What you think, you become.", author: "Buddha" },
  { text: "Happiness is not something readymade. It comes from your own actions.", author: "Dalai Lama" },
  { text: "We rise by lifting others.", author: "Robert Ingersoll" },
  { text: "In learning you will teach, and in teaching you will learn.", author: "Phil Collins" },
  { text: "It is not what you do for your children, but what you have taught them to do for themselves.", author: "Ann Landers" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
  { text: "Tell me and I forget, teach me and I may remember, involve me and I learn.", author: "Benjamin Franklin" },
  { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
  { text: "The roots of education are bitter, but the fruit is sweet.", author: "Aristotle" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "Respect for ourselves guides our morals, respect for others guides our manners.", author: "Laurence Sterne" },
  { text: "Character is doing the right thing when nobody is looking.", author: "J.C. Watts" },
  { text: "Unity is strength. When there is teamwork and collaboration, wonderful things can be achieved.", author: "Mattie Stepanek" },
  { text: "Peace begins with a smile.", author: "Mother Teresa" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "What we learn with pleasure, we never forget.", author: "Alfred Mercier" },
  { text: "A child educated only at school is an uneducated child.", author: "George Santayana" },
  { text: "Technology should build character, not control it.", author: "SanskaarPath" },
  { text: "True knowledge exists in knowing that you know nothing.", author: "Socrates" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
];

export function getDailyQuote() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  return quotes[dayOfYear % quotes.length];
}

export function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export default quotes;
