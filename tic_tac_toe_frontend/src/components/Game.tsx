"use client";

import React, { useMemo, useState } from "react";

type Player = "X" | "O";
type Cell = Player | null;

const WIN_LINES: number[][] = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // cols
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6],
];

function calculateWinner(cells: Cell[]): { winner: Player; line: number[] } | null {
  for (const [a, b, c] of WIN_LINES) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return { winner: cells[a] as Player, line: [a, b, c] };
    }
  }
  return null;
}

function isBoardFull(cells: Cell[]): boolean {
  return cells.every((c) => c !== null);
}

// PUBLIC_INTERFACE
export default function Game() {
  /**
   * This is the main Tic Tac Toe game component.
   * - Renders a 3x3 board with accessible buttons for cells
   * - Tracks current player turns (X/O)
   * - Detects wins and draws, highlighting the winning line
   * - Maintains session score (X wins, O wins, draws)
   * - Provides Reset Game (clears board and score) and New Round (clears board only)
   * - Styled to match the Ocean Professional theme, using TailwindCSS
   */
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [scores, setScores] = useState<{ X: number; O: number; draws: number }>({
    X: 0,
    O: 0,
    draws: 0,
  });

  const result = useMemo(() => calculateWinner(board), [board]);
  const winningLine = result?.line ?? [];
  const gameOver = !!result || isBoardFull(board);

  const statusText = useMemo(() => {
    if (result) {
      return `Winner: ${result.winner}`;
    }
    if (isBoardFull(board)) {
      return "It's a draw";
    }
    return `Turn: ${xIsNext ? "X" : "O"}`;
  }, [board, result, xIsNext]);

  const handleClick = (index: number) => {
    if (board[index] || gameOver) return;

    const nextBoard = board.slice();
    nextBoard[index] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);

    const outcome = calculateWinner(nextBoard);
    if (outcome) {
      setScores((prev) => ({ ...prev, [outcome.winner]: prev[outcome.winner] + 1 }));
    } else if (isBoardFull(nextBoard)) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  // PUBLIC_INTERFACE
  const newRound = () => {
    /** Clears the board while preserving accumulated scores. */
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    /** Clears the board and resets the scoreboard to zero. */
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setScores({ X: 0, O: 0, draws: 0 });
  };

  const cellAriaLabel = (i: number) => {
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;
    const content = board[i] ? board[i] : "empty";
    return `Cell ${row}, ${col}, ${content}`;
    };

  return (
    <div className="w-full max-w-md">
      {/* Status and Scores Card */}
      <div className="mb-6 rounded-xl bg-white shadow-md ring-1 ring-black/5 transition-all">
        <div className="px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Tic Tac Toe</h2>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm transition-colors ${
                result
                  ? "bg-amber-100 text-amber-700"
                  : isBoardFull(board)
                  ? "bg-gray-100 text-gray-700"
                  : "bg-blue-100 text-blue-700"
              }`}
              aria-live="polite"
            >
              {statusText}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-blue-50 px-3 py-2">
              <p className="text-xs text-blue-700/80">X Wins</p>
              <p className="text-xl font-semibold text-blue-700">{scores.X}</p>
            </div>
            <div className="rounded-lg bg-amber-50 px-3 py-2">
              <p className="text-xs text-amber-700/80">Draws</p>
              <p className="text-xl font-semibold text-amber-700">{scores.draws}</p>
            </div>
            <div className="rounded-lg bg-blue-50 px-3 py-2">
              <p className="text-xs text-blue-700/80">O Wins</p>
              <p className="text-xl font-semibold text-blue-700">{scores.O}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Board */}
      <div
        className="relative mb-6 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-black/5 transition-all"
        role="group"
        aria-label="Tic Tac Toe board"
      >
        <div className="grid grid-cols-3 gap-3">
          {board.map((value, i) => {
            const isWinning = winningLine.includes(i);
            return (
              <button
                key={i}
                aria-label={cellAriaLabel(i)}
                onClick={() => handleClick(i)}
                className={[
                  "flex aspect-square items-center justify-center rounded-xl border",
                  "text-3xl font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
                  value === "X" ? "text-blue-600" : value === "O" ? "text-amber-600" : "text-gray-400",
                  isWinning ? "bg-amber-50 border-amber-300 shadow-md" : "bg-white border-gray-200 hover:border-blue-300 hover:shadow",
                  gameOver && !isWinning ? "opacity-90" : "opacity-100",
                ].join(" ")}
              >
                {value}
              </button>
            );
          })}
        </div>

        {/* Subtle corner gradient accents */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5"></div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={newRound}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 active:translate-y-[1px] transition"
        >
          New Round
        </button>
        <button
          onClick={resetGame}
          className="inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-white shadow hover:bg-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 active:translate-y-[1px] transition"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}
