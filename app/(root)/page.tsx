'use client'
import React, { useEffect, useState } from 'react';
import { signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase-admin/config';
import Dashboard from './_components/dashboard';
import Login from '@/components/login';
import Register from '@/components/register';

const RootPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [showLogin, setShowLogin] = useState(true); // State for login/register toggle

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Set loading to false once auth state is determined
    });

    return () => unsubscribe();
  }, []);

  const handleToggleForm = () => {
    setShowLogin((prev) => !prev); // Toggle showLogin state
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null); // Clear user state on sign out
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Todo App</h1>
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Todo App</h1>
        {showLogin ? (
          <Login />
        ) : (
          <Register />
        )}
        <button
          onClick={handleToggleForm}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          {showLogin ? "Switch to Register" : "Switch to Login"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={signOut}
        className="w-200 p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
      >
        Sign Out
      </button>
      <Dashboard />
    </div>
  );
};

export default RootPage;
