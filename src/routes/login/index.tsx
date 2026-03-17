import { authClient } from "#/lib/auth-client";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/login/")({
  component: BetterAuthDemo,
});

function BetterAuthDemo() {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session?.user) {
      return;
    }

    void navigate({ to: "/" });
  }, [navigate, session?.user]);

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f0e8] px-4">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[rgba(74,55,40,0.2)] border-t-[#1a1612]" />
      </main>
    );
  }

  if (session?.user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        const result = await authClient.signUp.email({
          email,
          password,
          name,
        });
        if (result.error) {
          setError(result.error.message || "Sign up failed");
        }
      } else {
        const result = await authClient.signIn.email({
          email,
          password,
        });
        if (result.error) {
          setError(result.error.message || "Sign in failed");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f0e8] px-4 py-12 text-[#1a1612] sm:px-8">
      <section className="mx-auto w-full max-w-[520px] border border-[rgba(74,55,40,0.14)] bg-[#f8f3eb] p-6 sm:p-8">
        <p className="mb-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-[#c9a84c]">
          Invitely Account
        </p>
        <h1 className="font-['Playfair_Display'] text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.1] font-bold">
          {isSignUp ? "Create an account" : "Sign in"}
        </h1>
        <p className="mb-7 mt-3 text-sm leading-6 text-[#8c7b6b]">
          {isSignUp
            ? "Enter your information to create an account"
            : "Sign in to save your card progress and access My cards"}
        </p>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {isSignUp && (
            <div className="grid gap-2">
              <label
                htmlFor="name"
                className="text-[0.78rem] font-medium uppercase tracking-[0.08em] text-[#8c7b6b]"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 w-full border border-[rgba(74,55,40,0.2)] bg-white px-3 text-sm text-[#1a1612] outline-none transition focus:border-[#c9a84c]"
                required
              />
            </div>
          )}

          <div className="grid gap-2">
            <label
              htmlFor="email"
              className="text-[0.78rem] font-medium uppercase tracking-[0.08em] text-[#8c7b6b]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 w-full border border-[rgba(74,55,40,0.2)] bg-white px-3 text-sm text-[#1a1612] outline-none transition focus:border-[#c9a84c]"
              required
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="text-[0.78rem] font-medium uppercase tracking-[0.08em] text-[#8c7b6b]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 w-full border border-[rgba(74,55,40,0.2)] bg-white px-3 text-sm text-[#1a1612] outline-none transition focus:border-[#c9a84c]"
              required
              minLength={8}
            />
          </div>

          {error && (
            <div className="border border-[#e7b3a0] bg-[#fff4ef] p-3">
              <p className="text-sm text-[#b85c38]">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 h-10 w-full bg-[#1a1612] px-4 text-[0.82rem] font-medium uppercase tracking-[0.08em] text-[#f5f0e8] transition hover:bg-[#4a3728] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#8c7b6b] border-t-[#f5f0e8]" />
                <span>Please wait</span>
              </span>
            ) : isSignUp ? (
              "Create account"
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="text-sm text-[#8c7b6b] transition-colors hover:text-[#4a3728]"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </section>
    </main>
  );
}
