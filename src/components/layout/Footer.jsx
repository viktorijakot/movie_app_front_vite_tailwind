import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footerContainer">
      <footer className="py-4">
        <div className="content">
          <p>
            <Link to={"/"} className="link">
              FRIENDS TV
            </Link>{" "}
            by <a href="https://jgthms.com">Viktorija Kotaite</a>. The source
            code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            The website content is licensed{" "}
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
              CC BY NC SA 4.0
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
