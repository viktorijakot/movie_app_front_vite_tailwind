import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  email: "",
  userName: "",
  login(email, token) {},
  logout() {},
  isUserLoggedIn: false,
});

AuthContext.displayName = "MineAuthorization";

export default function AuthCtxProvider({ children }) {
  const [authState, setAuthState] = useState({
    token: "",
    email: "",
    userName: "",
  });

  const login = (email, token, userName) => {
    setAuthState({
      token,
      email,
      userName,
    });
  };

  const logout = () => {
    setAuthState({
      token: "",
      email: "",
      userName: "",
    });
  };

  const isUserLoggedIn = !!authState.token;

  const ctxValue = {
    isUserLoggedIn,
    token: authState.token,
    email: authState.email,
    userName: authState.userName,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
