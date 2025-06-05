
import React from 'react';

export const WelcomeHeader = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const userName = "Buddy"; // This could be dynamic from user settings

  return (
    <div className="mb-6 animate-fade-in">
      <h1 className="text-2xl font-semibold text-slate-800 mb-2">
        {getGreeting()}, {userName}! 👋
      </h1>
      <p className="text-slate-600">Ready to make today productive? Let's see what's cooking... 🍳</p>
    </div>
  );
};
