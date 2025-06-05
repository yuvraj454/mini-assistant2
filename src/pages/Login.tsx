
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Lock } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuthContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Oops! 😅",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (isSignUp && !name) {
      toast({
        title: "What's your name? 😊",
        description: "Please enter your name to continue.",
        variant: "destructive",
      });
      return;
    }

    const success = login(email, password, name);
    if (success) {
      toast({
        title: isSignUp ? "Welcome aboard! 🎉" : "Welcome back! 👋",
        description: "Ready to make today productive?",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-3xl p-8 cozy-shadow">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-amber-800 mb-2">MyMiniSecretary</h1>
            <p className="text-amber-600">Your daily dose of smart support ✨</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-amber-500" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="What should I call you?"
                    className="pl-10 rounded-xl border-amber-200 focus:border-amber-400 bg-cream-50"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-amber-500" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="pl-10 rounded-xl border-amber-200 focus:border-amber-400 bg-cream-50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-amber-500" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your secure password"
                  className="pl-10 rounded-xl border-amber-200 focus:border-amber-400 bg-cream-50"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white py-3"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-amber-600 hover:text-amber-800 underline"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
