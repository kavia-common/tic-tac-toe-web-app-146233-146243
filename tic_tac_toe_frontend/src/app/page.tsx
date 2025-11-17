import Game from "@/components/Game";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-500/10 to-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Ocean Tic Tac Toe
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Play a quick game. Blue for X, Amber for O. Smooth, modern, and lightweight.
          </p>
        </div>
        <div className="flex w-full items-center justify-center">
          <Game />
        </div>
      </div>
    </main>
  );
}
