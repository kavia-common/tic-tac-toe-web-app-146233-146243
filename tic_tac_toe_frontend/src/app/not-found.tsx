import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-500/10 to-gray-50 flex items-center justify-center px-4">
      <section
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-md ring-1 ring-black/5"
        role="alert"
        aria-live="assertive"
      >
        <header className="mb-3">
          <h1 className="text-2xl font-semibold text-gray-900">404 – Page Not Found</h1>
          <p className="mt-1 text-sm text-gray-600">
            The page you’re looking for doesn’t exist.
          </p>
        </header>
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 transition"
        >
          Go Home
        </Link>
      </section>
    </main>
  );
}
