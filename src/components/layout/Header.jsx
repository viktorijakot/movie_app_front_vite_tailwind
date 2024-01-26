import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/AuthCtxProvider";
import LOGO from "../../assets/logo.svg";

function Header() {
  const { isUserLoggedIn, logout } = useAuthContext();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/home");
  }

  return (
    <div className="headerContainer">
      <header className="container flex justify-between items-center">
        <Link
          to="/"
          className="logoLink text-2xl font-semibold py-4 flex justify-between items-center"
        >
          <img className="h-12 w-auto me-2" src={LOGO} alt="logo" />
          <p className="logo">FRIENDS TV</p>
        </Link>
        <nav>
          {!isUserLoggedIn && (
            <>
              <NavLink className={"login px-4 py-2 me-2 "} to={"/login"}>
                Login
              </NavLink>
              <NavLink
                className={"signUp px-3 py-2 sm:px-5 sm:py-3 rounded shadow"}
                to={"/register"}
              >
                Sign up
              </NavLink>
            </>
          )}
          {isUserLoggedIn && (
            <button
              onClick={handleLogout}
              className={"px-4 py-2 hover:bg-slate-500 hover:text-white"}
            >
              Logout
            </button>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;
