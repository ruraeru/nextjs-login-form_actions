import type { Metadata } from "next";
import "../globals.css";
import Navigation from "@/components/navigation";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative max-w-screen-sm mx-auto py-10 px-5 bg-neutral-900 text-white">
        <Navigation />
        {children}
      </body>
    </html>
  );
}