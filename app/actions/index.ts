"use server";

import { signIn, signOut } from "next-auth/react";

export async function credentialLogin(formData: FormData) {
  console.log("formData", formData);
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return response;
  } catch (e) {
    throw e;
  }
}

export async function logout() {
  await signOut({});
}
