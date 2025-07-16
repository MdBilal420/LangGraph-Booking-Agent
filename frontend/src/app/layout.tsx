import type { Metadata } from "next";
import "./globals.css";
import { ChatProvider } from "@/contexts/ChatContext";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Travel Agent - AI Assistant",
  description: "Your intelligent travel companion for flight bookings, hotels, and travel planning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorBoundary>
          <div className="futuristic-bg min-h-screen">
            {/* Floating particles background */}
            <div className="particles">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 20}s`,
                    animationDuration: `${15 + Math.random() * 10}s`,
                  }}
                />
              ))}
            </div>
            
            <ChatProvider>
              <main className="relative z-10">
                {children}
              </main>
            </ChatProvider>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
