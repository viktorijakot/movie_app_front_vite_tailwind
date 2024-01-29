import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/AuthCtxProvider";
import LOGO from "../../assets/logo.svg";
import userSvg from "../../assets/userSvg.svg";

function Header() {
  const { isUserLoggedIn, logout, userName } = useAuthContext();
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
        <nav className="flex justify-center items-center">
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
            <>
              <img className="userSvg py-2" src={userSvg} alt="user" />
              <NavLink className={"login px-4 py-2 me-2 "} to={"/movie-list"}>
                {userName}
              </NavLink>
              <NavLink className={"login px-4 py-2 me-2 "} to={"/movie-list"}>
                Activity
              </NavLink>
              <NavLink className={"login px-4 py-2 me-2 "} to={"/movie-list"}>
                Firends
              </NavLink>
              <NavLink className={"login px-4 py-2 me-2 "} to={"/movie-list"}>
                Movie search
              </NavLink>
              <Link
                to={"/"}
                onClick={handleLogout}
                className={"signUp px-3 py-2 sm:px-5 sm:py-3 rounded shadow"}
              >
                Logout
              </Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Header;
