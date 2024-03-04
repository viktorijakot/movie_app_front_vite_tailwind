import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/AuthCtxProvider";
import LOGO from "../../assets/logo.svg";
import userSvg from "../../assets/userSvg.svg";
import FlyOutMenu from "../UI/FlyOutMenu";
import { baseBackendUrl } from "../helper";

function Header() {
  const { isUserLoggedIn, logout, userName, imgUrl } = useAuthContext();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/home");
  }
  console.log("imgUrl ===", imgUrl);

  return (
    <div className="header">
      <header className="container flex justify-between items-center">
        {!isUserLoggedIn && (
          <Link
            to="/"
            className="logoLink text-2xl font-semibold py-4 flex justify-between items-center"
          >
            <img className="h-12 w-auto me-2" src={LOGO} alt="logo" />
            <p className="logo">FRIENDS TV</p>
          </Link>
        )}
        {isUserLoggedIn && (
          <NavLink
            className={"userLogo py-4 flex justify-between items-center gap-1"}
            to={"/profile"}
          >
            {imgUrl ? (
              <img
                className="border border-white  w-10 h-10 object-cover rounded-full"
                src={
                  baseBackendUrl + (imgUrl !== "" ? imgUrl : "placeholder.webp")
                }
                alt="profile picture"
              />
            ) : (
              <img className="userSvg py-2 " src={userSvg} alt="user" />
            )}{" "}
            <p className="text-sm">{userName}</p>
          </NavLink>
        )}
        <nav className="flex justify-center items-center ">
          {!isUserLoggedIn && (
            <>
              <NavLink
                ariaCurrent="page"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "login  px-4 py-2 me-2 hover:underline "
                    : isActive
                    ? "login  px-4 py-2 me-2 underline "
                    : "login  px-4 py-2 me-2 hover:underline "
                }
                to={"/login"}
              >
                Login
              </NavLink>
              <NavLink
                className={"button px-3 py-2 sm:px-5 sm:py-3 rounded shadow"}
                to={"/sign-up"}
              >
                Sign up
              </NavLink>
            </>
          )}
          {isUserLoggedIn && (
            <>
              <FlyOutMenu />
              <NavLink
                ariaCurrent="page"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "login mobile px-4 py-2 me-2 hover:underline max-[768px]:me-0 max-[768px]:px-3"
                    : isActive
                    ? "login mobile px-4 py-2 me-2 underline max-[768px]:me-0 max-[768px]:px-3"
                    : "login mobile px-4 py-2 me-2 hover:underline max-[768px]:me-0 max-[768px]:px-3"
                }
                to={"/movie-list"}
              >
                Movie search
              </NavLink>
              <NavLink
                ariaCurrent="page"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "login mobile px-4 py-2 me-2 hover:underline max-[768px]:me-0 max-[768px]:px-3"
                    : isActive
                    ? "login mobile px-4 py-2 me-2 underline max-[768px]:me-0 max-[768px]:px-3"
                    : "login mobile px-4 py-2 me-2 hover:underline max-[768px]:me-0 max-[768px]:px-3"
                }
                to={"/movie-list"}
              >
                Activity
              </NavLink>
              <NavLink
                ariaCurrent="page"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "login mobile px-4 py-2 me-2 hover:underline max-[768px]:me-0 max-[768px]:px-3"
                    : isActive
                    ? "login mobile px-4 py-2 me-2 underline max-[768px]:me-0 max-[768px]:px-3"
                    : "login mobile px-4 py-2 me-2 hover:underline max-[768px]:me-0 max-[768px]:px-3"
                }
                to={"/friends-list"}
              >
                Friends
              </NavLink>
              <NavLink
                ariaCurrent="page"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "login mobile px-4 py-2 me-2 hover:underline max-[768px]:me-0 max-[768px]:px-3"
                    : isActive
                    ? "login mobile px-4 py-2 me-2 underline max-[768px]:me-0 max-[768px]:px-3"
                    : "login mobile px-4 py-2 me-2 hover:underline max-[768px]:me-0 max-[768px]:px-3"
                }
                to={"/my-movie-list"}
              >
                My movies
              </NavLink>
              <Link
                to={"/"}
                onClick={handleLogout}
                className={
                  "button mobile px-3 py-2 sm:px-5 sm:py-3 rounded shadow"
                }
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
