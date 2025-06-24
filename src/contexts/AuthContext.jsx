import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithRedirect,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  // Listen for user state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
      // If already logged in and not on dashboard, redirect
      if (firebaseUser && window.location.pathname === "/") {
        navigate("/dashboard", { replace: true });
      }
    });
    return unsubscribe;
    // eslint-disable-next-line
  }, [navigate]);

  const signInWithGoogle = async () => {
    setAuthLoading(true);
    try {
      await signInWithRedirect(auth, googleProvider);
      // onAuthStateChanged will handle navigation
    } catch (error) {
      setAuthLoading(false);
      throw error;
    }
  };

  const signOut = async () => {
    setAuthLoading(true);
    try {
      await firebaseSignOut(auth);
      setAuthLoading(false);
      navigate("/", { replace: true });
    } catch (error) {
      setAuthLoading(false);
      throw error;
    }
  };

  const value = {
    user,
    signInWithGoogle,
    signOut,
    authLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}