import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import heart from "../../assets/heart.svg";

function Card({ imgSrc, description = "", button, title, link }) {
  return (
    <div className="wrapper">
      <div className="card">
        <div className="shape"></div>
        <div className="top">
          <img className="maestro" src={imgSrc} alt="meastro" />
          <h1 className="mt-5 max-[425px]:text-wrap">{title}</h1>
        </div>
        <div className="bottom">
          <div>
            <p className="mb-5 description">{description}</p>
            <div className="flex justify-evenly items-center buttons">
              <p className="like">❤️</p>
              {/* <img className="heart" src={heart} alt="heart" /> */}
              <Link
                className={"signUp px-3 py-2 sm:px-5 sm:py-3 rounded shadow "}
                to={link}
              >
                {button}
              </Link>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

Card.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
};
