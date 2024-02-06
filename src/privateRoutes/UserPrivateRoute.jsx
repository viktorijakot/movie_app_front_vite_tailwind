import { useAuthContext } from "../store/AuthCtxProvider";
import { Navigate } from "react-router-dom";

function UserPrivateRoute({ children }) {
  const { isUserLoggedIn } = useAuthContext();
  return isUserLoggedIn ? children : <Navigate to={"/login"} />;
}

export default UserPrivateRoute;
