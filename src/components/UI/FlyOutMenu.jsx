import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/AuthCtxProvider";

function FlyOutMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuthContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/home");
  }
  return (
    <div className="header-flyout-menu">
      <button
        className="menu-toggle-button signUp flex items-center px-1 py-1 sm:px-3 sm:py-3 rounded shadow"
        onClick={toggleMenu}
      >
        <div className="menu">
          <li></li>
          <li></li>
          <li></li>
        </div>
      </button>
      {isMenuOpen && (
        <div className="menu-content">
          <ul>
            <li>
              <NavLink onClick={() => setIsMenuOpen(false)} to={"/movie-list"}>
                Movie search
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setIsMenuOpen(false)} to={"/movie-list"}>
                Activities
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setIsMenuOpen(false)} to={"/movie-list"}>
                Friends
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setIsMenuOpen(false)} to={"/movie-list"}>
                My movies
              </NavLink>
            </li>
            <li>
              <Link onClick={handleLogout}>
                <strong>Logout</strong>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default FlyOutMenu;
