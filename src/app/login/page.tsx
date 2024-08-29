// src/app/login/page.tsx
"use client";

import React from 'react';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./../lib/firebase";
import { useRouter } from "next/navigation";  // Use `next/navigation` instead of `next/router`

export default function Login() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/"); // Redirect to home page after login
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Sign in with Google
      </button>
    </div>
  );
}
