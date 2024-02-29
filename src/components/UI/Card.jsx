import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuthContext } from "../../store/AuthCtxProvider";
import axios from "axios";
import { URL_BASE } from "../helper";
import toast from "react-hot-toast";
import { useState } from "react";

function Card({ imgSrc, description = "", button, title, link, movieId }) {
  const { token, isUserLoggedIn } = useAuthContext();
  const [like, setLike] = useState(false);
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
        setLike(true);
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
  const handleUnlike = (id, title) => {
    axios
      .delete(`${URL_BASE}myMoviesList/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(`You just removed ${title} movie from your list!`);
        setLike(false);
      })
      .catch((error) => {
        if (error.response.data.error === "Email is already taken") {
          return toast.success("You already removed this movie", {
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
            <p className="mb-10 line-clamp-3 description">{description}</p>
            <div
              className={
                isUserLoggedIn
                  ? "flex justify-evenly items-center buttons"
                  : "flex justify-center items-center "
              }
            >
              {isUserLoggedIn && (
                <p
                  className={
                    !like
                      ? "like text-[#1f271b] text-7xl pb-2 cursor-pointer duration-1000 hover:text-[#28afb0]"
                      : "like text-[#28afb0] text-7xl pb-2 cursor-pointer duration-1000 hover:text-[#1f271b]"
                  }
                  onClick={() =>
                    !like
                      ? handleLike(imgSrc, description, title, movieId)
                      : handleUnlike(movieId, title)
                  }
                >
                  ❤️
                </p>
              )}
              {/* <p
                className={isUserLoggedIn ? "like pb-2" : "hidden"}
                onClick={() => handleLike(imgSrc, description, title, movieId)}
              >
                ❤️
              </p> */}
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
