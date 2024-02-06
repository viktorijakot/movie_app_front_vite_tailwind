import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext({
  token: "",
  email: "",
  userName: "",
  userId: "",
  login(email, token) {},
  logout() {},
  isUserLoggedIn: false,
  isUserAdmin: false,
});

AuthContext.displayName = "MineAuthorization";

function parseJWTTokenData(token) {
  if (!token) return {};

  const tokenData = jwtDecode(token);

  const dataNow = Date.now() / 1000;
  const expire = tokenData.exp + tokenData.iat;

  if (dataNow > expire) {
    localStorage.removeItem("token");
    return {};
  }

  return { ...tokenData, token: token };
}

export default function AuthCtxProvider({ children }) {
  let tokenData = parseJWTTokenData(localStorage.getItem("token"));

  const [authState, setAuthState] = useState({
    token: tokenData?.token || "",
    email: tokenData?.email || "",
    userName: tokenData?.userName || "",
    userId: tokenData?.sub || "",
  });

  const login = (email, token) => {
    const tokenData = jwtDecode(token);
    setAuthState({
      token,
      email,
      userName: tokenData.userName,
      userId: tokenData.sub,
    });
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuthState({
      token: "",
      email: "",
      userName: "",
      userId: "",
    });
    localStorage.removeItem("token");
  };

  const isUserLoggedIn = !!authState.token;

  let isUserAdmin = false;
  if (isUserLoggedIn) {
    const tokenData = jwtDecode(authState.token);
    isUserAdmin = !!(
      tokenData.hasOwnProperty("scope") && tokenData.scope === "admin"
    );
  }

  const ctxValue = {
    isUserLoggedIn,
    isUserAdmin,
    token: authState.token,
    email: authState.email,
    userName: authState.userName,
    userId: authState.userId,
    login,
    logout,
  };
  console.log("authState ===", authState);
  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
