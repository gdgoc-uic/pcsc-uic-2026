"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageHero from "@/app/components/sections/PageHero";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createBrowserSupabaseClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/admin/certificates");
      }
    };

    void checkSession();
  }, [router]);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      setMessage("Email and password are required.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage("Login successful. Redirecting...");
      router.replace("/admin/certificates");
      router.refresh();
    } catch {
      setMessage("Unable to sign in right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-29 min-h-screen bg-brick-red-950 text-white">
      <PageHero
        title="Admin Login"
        description="Sign in with your authorized admin account to manage certificate templates."
      />

      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <section className="rounded-xl border border-brick-red-600 bg-brick-red-800/40 p-5 sm:p-6 space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-sm text-white/90 mb-1"
            >
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-300"
              placeholder="admin@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-sm text-white/90 mb-1"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-brick-red-500 bg-brick-red-900/70 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-rose-300"
              autoComplete="current-password"
            />
          </div>

          <button
            type="button"
            onClick={handleSignIn}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brick-red-700 hover:bg-rose-100 disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Sign In
          </button>

          {message ? <p className="text-sm text-white/85">{message}</p> : null}
        </section>
      </div>
    </main>
  );
}
