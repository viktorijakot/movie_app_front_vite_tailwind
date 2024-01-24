import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/AuthCtxProvider";

function Header() {
  const { isUserLoggedIn, logout } = useAuthContext();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <div className="bg-slate-300">
      <header className="container flex justify-between items-center">
        <Link to="/home" className="text-2xl font-semibold py-4">
          LOGO
        </Link>
        <nav>
          <NavLink
            className={"px-4 py-2 hover:bg-slate-500 hover:text-white"}
            to={"/home"}
          >
            Home
          </NavLink>
          <NavLink
            className={"px-4 py-2 hover:bg-slate-500 hover:text-white"}
            to={"/login"}
          >
            Login
          </NavLink>
          <NavLink
            className={"px-4 py-2 hover:bg-slate-500 hover:text-white"}
            to={"/register"}
          >
            Register
          </NavLink>
          <button
            onClick={handleLogout}
            className={"px-4 py-2 hover:bg-slate-500 hover:text-white"}
          >
            Logout
          </button>
        </nav>
      </header>
    </div>
  );
}

export default Header;
