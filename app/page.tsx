"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const HomePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/login" });

    router.push(data.url);
  };
  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <Link href="/login">SignIn</Link>
      </button>{" "}
      <br />
      <br />
      <button
        onClick={handleLogout}
        className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
