import React, { createContext, useContext, ReactNode } from "react";

import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";
import { Redirect } from "expo-router";


// global auth provider and fetch the current user, if the user is there, than redirect to the home screen
// or if the user is not there, redirect to the signin screen 
interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

// protect the string and properly redirect users
// create a global auth provider,  fetch the current user,  if the user is not there,
//  than redirect to the signin screen,
// if user is there, direct to the home screen.
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const isLogged = !!user;
  // !null = true => !true = false; 
  // !false = true
  // !{name: 'Mono'}  = false => !false => true

  console.log("pretty json from global-provider.tsx: ",JSON.stringify(user, null, 2))
  return (
    // accessable from anywhere of the code
    <GlobalContext.Provider
      value={{
        isLogged,
        user,
        loading,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  // https://react.dev/learn/passing-data-deeply-with-context
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;