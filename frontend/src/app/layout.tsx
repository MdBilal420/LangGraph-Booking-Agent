import type { Metadata } from "next";
import "./globals.css";
import { ChatProvider } from "@/contexts/ChatContext";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "WanderAI - Your AI Travel Assistant",
  description: "Plan trips, book flights, find hotels, and explore destinations with your intelligent travel companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ErrorBoundary>
          <ChatProvider>
            {children}
          </ChatProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
