
import React from 'react';

const quotes = [
  "Today is a good day to have a good day! ✨",
  "Small steps lead to big changes. Keep going! 🌟",
  "You're doing better than you think you are. 💙",
  "Progress, not perfection. Every step counts! 🎯",
  "Believe in yourself as much as I believe in you! 🌈",
  "Today's accomplishments are tomorrow's stepping stones. 🪜",
];

export const QuoteOfTheDay = () => {
  // Get a consistent quote for the day
  const today = new Date().getDate();
  const todaysQuote = quotes[today % quotes.length];

  return (
    <div className="glass-card rounded-2xl p-6 cozy-shadow mb-6 warm-gradient">
      <div className="text-center">
        <h3 className="text-lg font-medium text-slate-800 mb-3">Daily Inspiration</h3>
        <p className="text-slate-700 font-medium leading-relaxed">{todaysQuote}</p>
      </div>
    </div>
  );
};
