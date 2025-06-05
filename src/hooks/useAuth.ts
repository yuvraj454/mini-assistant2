
import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('myminisecretary-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string, name?: string) => {
    // Simple mock authentication
    const newUser: User = {
      id: Date.now().toString(),
      name: name || 'User',
      email,
    };
    setUser(newUser);
    localStorage.setItem('myminisecretary-user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('myminisecretary-user');
    localStorage.removeItem('myminisecretary-tasks');
    localStorage.removeItem('myminisecretary-notes');
  };

  const clearAllData = () => {
    localStorage.removeItem('myminisecretary-tasks');
    localStorage.removeItem('myminisecretary-notes');
  };

  return {
    user,
    isLoading,
    login,
    logout,
    clearAllData,
  };
};
