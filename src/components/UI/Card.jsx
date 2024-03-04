import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuthContext } from "../../store/AuthCtxProvider";
import axios from "axios";
import { URL_BASE } from "../helper";
import toast from "react-hot-toast";
import { useState } from "react";
import MovieRating from "./MovieRating";
import useGetApiData from "../../hooks/useGetApiData";

function Card({ imgSrc, description = "", button, title, link, movieId }) {
  const { token, isUserLoggedIn } = useAuthContext();
  const [like, setLike] = useState(false);
  const [rating, setRating] = useGetApiData(`${URL_BASE}ratings/${movieId}`);
  const [overallRating, setOverallRating] = useGetApiData(
    `${URL_BASE}ratings/${movieId}`
  );
  const [commentsList, setCommentsList] = useGetApiData(
    `${URL_BASE}comments/${movieId}`
  );
  const [likedMovieList, setLikedMovieList] = useGetApiData(
    `${URL_BASE}/myMoviesList/movie/${movieId}`
  );
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
  const handleRating = (movieId, rating) => {
    axios
      .post(
        `${URL_BASE}ratings`,
        {
          movieId,
          rating,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        toast.success(
          response?.data.msg || "Movie rating was successfully added!"
        );
        setRating({ avgRating: rating });
        setOverallRating({
          avgRating: (
            (overallRating.avgRating * overallRating.users + rating) /
            (overallRating.users + 1)
          ).toFixed(2),
          users: overallRating.users + 1,
        });
      })
      .catch((error) => {
        if (error.response.data.error === "Email is already taken") {
          return toast.success("You already rated this movie", {
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
            <p className="line-clamp-3 description mb-5">{description}</p>
            {isUserLoggedIn && (
              <>
                <div className="flex justify-center items-baseline gap-3 ">
                  <MovieRating
                    rating={rating.avgRating}
                    onRating={(rating) => {
                      handleRating(movieId, rating);
                      console.log("rating ===", rating);
                    }}
                  />
                  <div>
                    <p className="text-xl text-[#62c0a2] font-bold">
                      {overallRating.avgRating}/{overallRating.users}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-bold">Comments ({commentsList.length})</p>
                </div>
                <div>
                  <p className="font-bold">
                    Added to movie list ({likedMovieList.length})
                  </p>
                </div>
              </>
            )}
            <div
              className={
                isUserLoggedIn
                  ? "flex justify-evenly items-center buttons "
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
