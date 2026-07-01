import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 py-8">
        <header className="mb-12 text-center">
         <Link
  to="/"
  className="inline-flex items-center gap-3 text-2xl font-bold tracking-tight"
>
            <div className="rounded-xl bg-indigo-600 p-2 shadow-lg shadow-indigo-600/30">
              <Search className="h-5 w-5" />
            </div>

            <span>Influencer Search</span>
          </Link>

          {title && (
            <>
             <h1 className="mt-8 text-4xl md:text-6xl font-bold tracking-tight">
  {title}
</h1>

<div className="mt-4 flex justify-center">
  <p className="max-w-2xl text-center text-base md:text-xl text-slate-400">
    Discover creators across Instagram, YouTube, and TikTok.
  </p>
</div>
            </>
          )}
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}