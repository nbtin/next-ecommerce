import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Hydrate from "./components/Hydrate";
import { Roboto, Lobster_Two } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const lobster = Lobster_Two({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-lobster",
});

export const metadata: Metadata = {
  title: "1Piece - The Best One Piece Figures Shop",
  description: "Written by Peter (Bao-Tin) Nguyen",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // fetch the user
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className={`${roboto.variable} ${lobster.variable}`}>
      <Hydrate>
        <Nav user={session?.user} expires={session?.expires as string} />
        {children}
      </Hydrate>
    </html>
  );
}
