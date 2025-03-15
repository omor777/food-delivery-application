"use client";

import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();

  const { data: session } = useSession();

  console.log(session);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const response = await signIn(
        "credentials",
        {
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          redirect: false,
          callbackUrl: "/",
        },
        {
          prompt: "login",
        }
      );

      if (response?.ok) {
        router.push("/");
      } else {
        console.log(response?.error);
      }
    } catch (error) {
      console.log("Error in login: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" id="email" placeholder="Email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
        <br />
      </form>

      <button
        onClick={() => signOut({ redirect: false, callbackUrl: "/login" })}
      >
        Logout
      </button>
    </div>
  );
};

export default LoginPage;
