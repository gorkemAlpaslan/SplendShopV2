'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const { user, loading, error, registerUser, signInUser, forgotPassword } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [resetEmail, setResetEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      if (isSignIn) {
        await signInUser(formData.email, formData.password);
        router.push('/profile');
      } else {
        await registerUser(formData.email, formData.name, formData.password);
        router.push('/profile');
      }
    } catch (err: any) {
      setMessage(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      await forgotPassword(resetEmail);
      setMessage('Password reset email sent! Check your inbox.');
      setTimeout(() => {
        setIsForgotPassword(false);
        setResetEmail('');
      }, 3000);
    } catch (err: any) {
      setMessage(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 pt-24 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-4"
        >
          <div className="bg-card rounded-2xl border border-border shadow-xl p-8">
            <AnimatePresence mode="wait">
              {!isForgotPassword ? (
                <motion.div
                  key="auth"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h1 className="text-3xl font-serif font-bold mb-2 text-center text-foreground">
                    {isSignIn ? 'Welcome Back' : 'Create Account'}
                  </h1>
                  <p className="text-muted-foreground text-center mb-8">
                    {isSignIn
                      ? 'Sign in to your account'
                      : 'Sign up to get started'}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isSignIn && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="relative"
                      >
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                        <Input
                          type="text"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="pl-10"
                          required={!isSignIn}
                        />
                      </motion.div>
                    )}

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>

                    {isSignIn && (
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="text-sm text-accent hover:text-accent/80 text-right w-full transition-colors"
                      >
                        Forgot password?
                      </button>
                    )}

                    {message && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-sm text-center p-3 rounded-lg ${message.includes('sent') || message.includes('success')
                          ? 'text-green-600 bg-green-50 dark:bg-green-950/30'
                          : 'text-red-600 bg-red-50 dark:bg-red-950/30'
                          }`}
                      >
                        {message}
                      </motion.p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          {isSignIn ? 'Sign In' : 'Sign Up'}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => {
                        setIsSignIn(!isSignIn);
                        setMessage('');
                        setFormData({ email: '', password: '', name: '' });
                      }}
                      className="text-accent hover:text-accent/80 font-medium transition-colors"
                    >
                      {isSignIn
                        ? "Don't have an account? Sign up"
                        : 'Already have an account? Sign in'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="forgot"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h1 className="text-3xl font-serif font-bold mb-2 text-center text-foreground">
                    Reset Password
                  </h1>
                  <p className="text-muted-foreground text-center mb-8">
                    Enter your email to receive a password reset link
                  </p>

                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>

                    {message && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-sm text-center p-3 rounded-lg ${message.includes('sent') || message.includes('success')
                          ? 'text-green-600 bg-green-50 dark:bg-green-950/30'
                          : 'text-red-600 bg-red-50 dark:bg-red-950/30'
                          }`}
                      >
                        {message}
                      </motion.p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        'Send Reset Link'
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => {
                        setIsForgotPassword(false);
                        setResetEmail('');
                        setMessage('');
                      }}
                      className="text-accent hover:text-accent/80 font-medium transition-colors"
                    >
                      Back to sign in
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
