"use client";
import React from "react";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const HomePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  console.log("sessions dfdfdfd", session);

  const handleLogout = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "/api/auth/signin",
    });
    router.push(data.url);
  };
  return (
    <form onSubmit={handleLogout}>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </form>
  );
};

export default HomePage;
