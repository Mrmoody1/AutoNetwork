import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoNetwork - Car Dealer Management",
  description: "Complete car dealer management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}