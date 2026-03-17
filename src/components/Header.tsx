import { Link, useRouter } from "@tanstack/react-router";
import { authClient } from "#/lib/auth-client";

export default function Header() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.navigate({ to: "/login" }); // redirect to login page
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(74,55,40,0.15)] bg-[#f5f0e8] px-4 py-4 sm:px-8">
      <div className="flex items-center justify-between gap-4">
        <Link to="/">
          <div
            className="flex items-center gap-2 text-[#4a3728]"
            aria-label="Invitely"
          >
            <span className="text-[0.95rem] text-[#c9a84c]">✦</span>
            <span className="font-['Playfair_Display'] text-[1.18rem] font-bold">
              Invitely
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <ul className="mx-4 hidden gap-8 sm:flex">
            <Link to="/">
              <li className="duration-300 hover:text-accent">Home</li>
            </Link>
            <Link to="/builder">
              <li className="duration-300 hover:text-accent">Builder</li>
            </Link>
            {user ? (
              <Link to="/cards">
                <li className="duration-300 hover:text-accent">My cards</li>
              </Link>
            ) : null}
            <Link to="/about">
              <li className="duration-300 hover:text-accent">About</li>
            </Link>
          </ul>

          {!user ? (
            <Link to="/login">
              <button
                className="hidden bg-[#1a1612] px-4 py-2 text-[0.8rem] font-medium tracking-[0.05em] text-[#f5f0e8] transition hover:bg-[#4a3728] sm:block"
                type="button"
              >
                Get started free
              </button>
            </Link>
          ) : (
            <button
              className="hidden bg-[#1a1612] px-4 py-2 text-[0.8rem] font-medium tracking-[0.05em] text-[#f5f0e8] transition hover:bg-[#4a3728] sm:block"
              type="button"
              onClick={signOut}
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
