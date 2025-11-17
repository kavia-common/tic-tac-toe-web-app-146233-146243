import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ocean Tic Tac Toe",
  description: "A modern, ocean-themed Tic Tac Toe game built with Next.js",
  applicationName: "Tic Tac Toe",
  authors: [{ name: "tic_tac_toe_frontend" }],
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
