import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.svg";

export default function LoginPage() {
  const { signInWithGoogle, authLoading, currentUser } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setError(null);
    setProcessing(true);
    try {
      await signInWithGoogle();
    } catch (e) {
      setError("Failed to sign in. Please try again.");
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [currentUser, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-200 via-indigo-200 to-indigo-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 transition-colors duration-300">
      <div className="relative w-full max-w-md px-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl ring-1 ring-indigo-100 dark:ring-gray-800 p-8 flex flex-col items-center">
          <img src={logo} alt="App Logo" className="w-16 h-16 mb-4" />
          <h1 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Welcome to the App</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">Sign in with Google to continue</p>
          <button
            aria-label="Sign in with Google"
            disabled={processing || authLoading}
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 text-gray-700 dark:text-gray-100 font-medium text-base"
          >
            <svg className="w-5 h-5" aria-hidden="true" focusable="false" viewBox="0 0 24 24"><g><path fill="#4285F4" d="M23.52 12.27c0-.84-.08-1.67-.23-2.46H12v4.66h6.48c-.28 1.51-1.13 2.78-2.41 3.64v3h3.9c2.28-2.1 3.55-5.2 3.55-8.84z"/><path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.9-3c-1.08.73-2.47 1.17-4.05 1.17-3.12 0-5.77-2.11-6.72-4.96H1.38v3.11C3.36 21.82 7.33 24 12 24z"/><path fill="#FBBC05" d="M5.28 14.31a7.16 7.16 0 0 1 0-4.62V6.58H1.38a11.98 11.98 0 0 0 0 10.84l3.9-3.11z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.36.61 4.6 1.81l3.44-3.44C17.96 1.46 15.24.25 12 .25 7.33.25 3.36 2.43 1.38 6.58l3.9 3.11C6.23 6.86 8.88 4.75 12 4.75z"/></g></svg>
            <span>Sign in with Google</span>
          </button>
          {error && (
            <p className="mt-4 text-sm text-red-500" role="alert">{error}</p>
          )}
        </div>
        {(processing || authLoading) && (
          <div className="absolute inset-0 bg-black/40 dark:bg-black/70 rounded-2xl flex items-center justify-center z-10">
            <span className="sr-only">Loading...</span>
            <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}