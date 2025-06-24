import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user, signOut, authLoading } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-sky-100 dark:from-gray-900 dark:to-gray-950 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl ring-1 ring-indigo-100 dark:ring-gray-800 p-8 flex flex-col items-center">
        <img
          src={user.photoURL || "/src/assets/logo.svg"}
          alt={user.displayName || "User"}
          className="w-20 h-20 rounded-full shadow-lg mb-4 border-2 border-indigo-300 dark:border-indigo-700"
        />
        <h2 className="text-2xl font-semibold text-indigo-800 dark:text-indigo-200 mb-1">
          {user.displayName}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">
          {user.email}
        </p>
        <button
          aria-label="Sign out"
          onClick={signOut}
          disabled={authLoading}
          className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}