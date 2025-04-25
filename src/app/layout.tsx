import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../styles/globals.css";

import TanStackProvider from "@/lib/TanStack/provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bloggin",
  description: "Have a nice day!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} scrollbar-gutter-stable overflow-y-scroll antialiased`}
      >
        <TanStackProvider>
          <AuthProvider>{children}</AuthProvider>
        </TanStackProvider>
        <Toaster />
      </body>
    </html>
  );
}
