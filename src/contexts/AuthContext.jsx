import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Check for current session on mount
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error.message);
      }
      
      setUser(data?.session?.user ?? null);
      setLoading(false);
    };
    
    checkSession();

    // Set up listener for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (event === 'SIGNED_IN') {
          toast.success('Signed in successfully!');
        } else if (event === 'SIGNED_OUT') {
          toast.success('Signed out successfully!');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    setAuthError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthError(error);
        return { error };
      }

      return { data };
    } catch (error) {
      setAuthError(error);
      return { error };
    }
  };

  const signUp = async (email, password) => {
    setAuthError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setAuthError(error);
        return { error };
      }

      return { data };
    } catch (error) {
      setAuthError(error);
      return { error };
    }
  };

  const signOut = async () => {
    setAuthError(null);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        setAuthError(error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      setAuthError(error);
      return { error };
    }
  };

  const resetPassword = async (email) => {
    setAuthError(null);
    
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });

      if (error) {
        setAuthError(error);
        return { error };
      }

      return { data };
    } catch (error) {
      setAuthError(error);
      return { error };
    }
  };

  const value = {
    user,
    loading,
    authError,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};