import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import heart from "../../assets/heart.svg";
import { useAuthContext } from "../../store/AuthCtxProvider";
import axios from "axios";
import { URL_BASE } from "../helper";
import toast from "react-hot-toast";

function Card({ imgSrc, description = "", button, title, link, movieId }) {
  const { token } = useAuthContext();
  const handleLike = (imgSrc, description, title, movieId) => {
    const data = {
      movieId,
      description,
      title,
      imgUrl: imgSrc,
    };
    axios
      .post(`${URL_BASE}myMoviesList`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(
          response?.data.msg || `You just added ${title} movie to your list!`
        );
      })
      .catch((error) => {
        if (error.response.data.error === "Email is already taken") {
          return toast.success("You already liked this movie", {
            style: {
              border: "1px solid #1f271b",
              padding: "16px",
              color: "#1f271b",
            },
            iconTheme: {
              primary: "#1f271b",
              secondary: "#62c0a2",
            },
          });
        }
        toast.error(error.response.data.error);
      });
  };
  return (
    <div className="cardWrapper">
      <div className="card">
        <div className="shape"></div>
        <div className="top">
          <img className="maestro" src={imgSrc} alt="meastro" />
          <h1 className="mt-5 ">{title}</h1>
        </div>
        <div className="bottom">
          <div>
            <p className="mb-5 description">{description}</p>
            <div className="flex justify-evenly items-center buttons">
              <p
                className="like"
                onClick={() => handleLike(imgSrc, description, title, movieId)}
              >
                ❤️
              </p>
              {/* <img className="heart" src={heart} alt="heart" /> */}
              <Link
                className={"button px-3 py-2 sm:px-5 sm:py-3 rounded shadow "}
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
