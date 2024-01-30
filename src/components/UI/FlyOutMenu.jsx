import { useState } from "react";

function FlyOutMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
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
            <li>Movies</li>
            <li>Activity</li>
            <li>Friends</li>
            <li>Movie search</li>
            <li>
              <strong>Logout</strong>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default FlyOutMenu;
