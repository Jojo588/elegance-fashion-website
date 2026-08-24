'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        // Handle specific error cases
        if (signInError.message === 'Email not confirmed') {
          setError('Please confirm your email before logging in. Check your inbox for the confirmation link.');
        } else if (signInError.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check and try again.');
        } else {
          setError(signInError.message || 'Failed to login. Please check your credentials.');
        }
        return;
      }

      if (data.user) {
        const { data: admin, error: adminError } = await supabase
          .from('admins')
          .select('id')
          .eq('id', data.user.id)
          .maybeSingle();

        if (adminError || !admin) {
          await supabase.auth.signOut();
          setError('Your Supabase authentication account is valid, but it is not registered as an admin. Add this user ID to public.admins before signing in.');
          return;
        }

        router.replace('/admin/dashboard/products');
      }
    } catch {
      setError('Unable to connect to authentication. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8 text-foreground">
      <div className="w-full max-w-md">
        <div className="mb-4 flex justify-end">
          <ThemeToggle />
        </div>
        <div className="space-y-8 rounded-2xl border border-border bg-card p-6 shadow-elegant sm:p-8">
          <div className="space-y-2 text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary">Niella&apos;s FashionHub</p>
            <h1 className="font-heading text-3xl font-semibold text-card-foreground sm:text-4xl">Admin Portal</h1>
            <p className="text-muted-foreground">Manage your fashion and lifestyle collection</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@niellasfashionhub.com"
                  className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Only store admins can access this portal</p>
            <Link href="/" className="text-primary hover:underline">
              Back to store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
