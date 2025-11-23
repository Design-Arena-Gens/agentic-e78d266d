import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartSpend AI - Personal Finance Manager",
  description: "AI-powered expense tracking and financial management app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
