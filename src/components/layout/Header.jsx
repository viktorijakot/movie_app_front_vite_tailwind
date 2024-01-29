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
                to={"/sign-up"}
              >
                Sign up
              </NavLink>
            </>
          )}
          {isUserLoggedIn && (
            <Link
              to={"/"}
              onClick={handleLogout}
              className={"signUp px-3 py-2 sm:px-5 sm:py-3 rounded shadow"}
            >
              Logout
            </Link>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;
