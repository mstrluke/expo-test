import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export interface AuthContextType {
  user: string | null;
  setUser: (user: any) => void;
  setSignedIn: (v: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  const getUser = useCallback(async () => {
    const user = await AsyncStorage.getItem('user');
    setUser(user);
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (signedIn) {
      router.replace('/home');
    } else {
      router.replace('/')
    }
  }, [signedIn]);

  const values = useMemo(() => ({
    user,
    setUser,
    setSignedIn,
  }), [user, signedIn]);

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};
