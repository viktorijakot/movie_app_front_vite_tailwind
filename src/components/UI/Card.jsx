import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Card({ imgSrc, description, button }) {
  return (
    <div className="wrapper">
      <div className="card">
        <div className="shape"></div>
        <div className="top">
          <img src={imgSrc} alt="meastro" />
          <h1 className="mt-5">Description</h1>
        </div>
        <div className="bottom">
          <p className="mb-5 mt-3">{description}</p>
          <Link
            className={"signUp px-3 py-2 sm:px-5 sm:py-3 rounded shadow "}
            to={"/sign-up"}
          >
            {button}
          </Link>
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
