"use client";

import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";


export default function Nav({ user }: Session) {
  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
      <h1>1Piece</h1>
      </Link>
      <ul className="flex items-center gap-12">
        {/* if the user is not signed in */}
        {!user && (
          <li className="bg-teal-600 text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>Sign in</button>
          </li>
        )}
        {/* if the user is signed in */}
        {user && (
          <li>
            <Image
              src={user?.image as string}
              alt={user?.name as string}
              width={48}
              height={48}
              className="rounded-full"
            ></Image>
          </li>
        )}
      </ul>
    </nav>
  );
}
