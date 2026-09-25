import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "PokéExplorer | Pokémon Explorer App",
  description: "A responsive Pokémon Explorer web application built with Next.js, Chakra UI and PokeAPI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
