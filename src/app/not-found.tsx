import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-darkBg text-white flex flex-col items-center justify-center p-8 text-center select-none">
      <h1 className="text-6xl md:text-8xl font-display font-light text-amber-500 mb-4 tracking-tighter">
        404
      </h1>
      <h2 className="text-xl md:text-2xl font-display font-light mb-6 tracking-tight">
        Page Not Found
      </h2>
      <p className="text-sm text-neutral-400 max-w-md mb-8">
        The requested luxury page or vehicle detail could not be found.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-all duration-300"
      >
        Return Home
      </Link>
    </div>
  );
}
