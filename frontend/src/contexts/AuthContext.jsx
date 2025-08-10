import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  backendURL: '',
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {}
});

export const AuthProvider = ({ children }) => {
  // Must be inside the component
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser]         = useState(null);

  // Provide the flat object, not { value }
  const value = {
    backendURL,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser
  };

  // If you want to debug, log here, _inside_ the component:

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
