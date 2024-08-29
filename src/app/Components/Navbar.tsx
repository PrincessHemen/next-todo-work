// src/app/Components/Navbar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

const Navbar = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/login'; // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 text-white py-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <h1 className="text-2xl font-bold">ToDo App</h1>
        <ul className="flex flex-wrap gap-4 text-base md:gap-6 md:text-lg">
          <li className="px-2 py-2 rounded-lg hover:bg-gray-700 hover:text-gray-300 cursor-pointer transition duration-300 md:px-3">
            <Link href="/">Home</Link>
          </li>
          <li className="px-2 py-2 rounded-lg hover:bg-gray-700 hover:text-gray-300 cursor-pointer transition duration-300 md:px-3">
            <Link href="/about">About</Link>
          </li>
          <li className="px-2 py-2 rounded-lg hover:bg-gray-700 hover:text-gray-300 cursor-pointer transition duration-300 md:px-3">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="px-2 py-2 rounded-lg hover:bg-gray-700 hover:text-gray-300 cursor-pointer transition duration-300 md:px-3">
            <Link href="/product">Products</Link>
          </li>
          {user ? (
            <li
              onClick={handleLogout}
              className="px-2 py-2 rounded-lg hover:bg-red-700 hover:text-gray-300 cursor-pointer transition duration-300 md:px-3"
            >
              Logout
            </li>
          ) : (
            <li className="px-2 py-2 rounded-lg hover:bg-gray-700 hover:text-gray-300 cursor-pointer transition duration-300 md:px-3">
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
