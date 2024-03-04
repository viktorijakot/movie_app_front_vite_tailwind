import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../store/AuthCtxProvider";
import toast from "react-hot-toast";
import { URL_BASE, baseBackendUrl } from "../components/helper";
import SmartInput from "../components/UI/SmartInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import Comments from "./comments/Comments";
import useGetApiData from "../hooks/useGetApiData";
import MovieRating from "../components/UI/MovieRating";
import userSvg from "./../assets/userSvg.svg";

function SingleMoviePage() {
  const [movie, setMovie] = useState();
  const { id } = useParams();
  const { token, userName, email, userId, imgUrl } = useAuthContext();
  const [like, setLike] = useState(false);
  const [commentsList, setCommentsList] = useGetApiData(
    `${URL_BASE}comments/${id}`
  );
  const [rating, setRating] = useGetApiData(`${URL_BASE}ratings/${id}`);
  const [overallRating, setOverallRating] = useGetApiData(
    `${URL_BASE}ratings/${id}`
  );
  const [likedMovieList, setLikedMovieList] = useGetApiData(
    `${URL_BASE}/myMoviesList/movie/${id}`
  );
  const [show, setShow] = useState(false);
  const [followingList, setFollowingList] = useGetApiData(
    `${URL_BASE}relations/myfollows`
  );
  console.log("likedMovieList ===", likedMovieList);
  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=96949423&i=${id}`)
      .then((resp) => {
        console.log("resp ===", resp);
        setMovie(resp.data);
      })
      .catch((error) => {
        console.log("error axios plot ===", error);
      });
  }, [id]);

  const handleLike = (description, title, img) => {
    const data = {
      movieId: id,
      description,
      title,
      imgUrl: img,
    };
    console.log("Like ===", like);
    axios
      .post(`${URL_BASE}myMoviesList`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(
          response?.data.msg || `You just added ${title} movie to your list!`
        );
        setLike(true);
        setLikedMovieList((currentMovieList) => [
          ...currentMovieList,
          {
            user_id: userId,
            userName,
            email,
            img_url: imgUrl,
          },
        ]);
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
  console.log("Like ===", like);
  const handleUnlike = (title) => {
    axios
      .delete(`${URL_BASE}myMoviesList/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(`You just removed ${title} movie from your list!`);
        setLike(false);
        setLikedMovieList((currentList) =>
          currentList.filter((currentObj) => currentObj.user_id !== userId)
        );
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

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().min(3).required(),
    }),
    onSubmit: (values, actions) => {
      sendAxiosData(values.comment);

      actions.resetForm();
    },
  });
  console.log("comments===", commentsList);
  function sendAxiosData(values) {
    const data = {
      movieId: id,
      comment: values,
    };
    axios
      .post(`${URL_BASE}/comments`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        console.log("resp", resp);
        toast.success("You created a new comment!");
        setCommentsList((currentComments) => [
          ...currentComments,
          {
            comment: values,
            email,
            userName,
            user_id: userId,
            created_at: new Date().toLocaleString("lt", "long"),
            img_url: imgUrl,
            id: resp.data.id,
          },
        ]);
      })
      .catch((error) => {
        console.log("register error ===", error);
        const klaida = error.response.data.error;
        toast.error(klaida);
      });
  }

  const handleCommentdelete = (commentId) => {
    axios
      .delete(`${URL_BASE}comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(`Your comment is successfully deleted!`);
        setCommentsList((currentComments) =>
          currentComments.filter(
            (currentCommentObj) => currentCommentObj.id !== commentId
          )
        );
      })
      .catch((error) => {
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
          response?.data.msg || "Item rating was successfully added!"
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
  const handleFollow = (follows, userName, email, img_url) => {
    const data = {
      follows,
      userName,
    };

    axios
      .post(`${URL_BASE}relations`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(response?.data.msg || `You are following ${follows}`);
        setFollowingList((currentFollowList) => [
          { id: follows, email, userName, img_url },
          ...currentFollowList,
        ]);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const handleUnfollow = (userId, userName) => {
    axios
      .delete(`${URL_BASE}relations/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success(`${userName} is successfully unfollowed!`);
        setFollowingList((currentFollowList) =>
          currentFollowList.filter(
            (currentFollowObj) => currentFollowObj.id !== userId
          )
        );
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="container min-h-screen flex justify-center">
      <div className="movieSingle  w-full mt-28 mb-24  modal_box px-4 lg:px-16 ">
        {movie && (
          <section className="flex justify-center items-center max-[425px]:flex-col">
            <div className="w-6/12 max-[425px]:min-w-full">
              <img
                className="min-w-max rounded-2xl max-[425px]:min-w-full"
                src={
                  movie.Poster === "N/A"
                    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"
                    : movie.Poster
                }
                alt="poster"
              />
            </div>
            <div className="w-6/12 max-[425px]:min-w-full max-[425px]:flex-col max-[425px]:justify-center max-[425px]:items-center">
              <div>
                <h1 className="text-3xl pb-4 max-[425px]:text-lg max-[425px]:text-center max-[425px]:mt-4">
                  <strong>{movie.Title}</strong>
                </h1>
              </div>
              <div className="max-[425px]:text-sm">
                <p>
                  <strong>Type:</strong> {movie.Type}
                </p>
                <p>
                  <strong>Genre:</strong> {movie.Genre}
                </p>

                <p>
                  <strong>Actors:</strong> {movie.Actors}
                </p>
                <p>
                  <strong>Director: </strong>
                  {movie.Director}
                </p>
                <p>
                  <strong>Released:</strong> {movie.Released}
                </p>
                <p>
                  <strong>Runtime:</strong> {movie.Runtime}
                </p>
                <p className="pt-4">
                  <strong>Imdb Rating:</strong> {movie.imdbRating}
                </p>
                <p>
                  <strong>Imdb Votes:</strong> {movie.imdbVotes}
                </p>
              </div>
              <div className="max-[425px]:text-sm">
                {movie.Ratings.map((rating, index) => {
                  return (
                    <p key={index}>
                      <strong>{rating.Source}:</strong> {rating.Value}
                    </p>
                  );
                })}
              </div>
              <div className="max-[425px]:text-sm">
                <p className="pt-4">{movie.Plot}</p>
              </div>
            </div>
          </section>
        )}
        <div className="flex justifyl-left items-baseline gap-3 mt-10">
          <MovieRating
            rating={rating.avgRating}
            onRating={(rating) => {
              handleRating(id, rating);
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
          <ul className="py-2 border border-white rounded px-2 mt-3 shadow-md divide-y  divide-[#f4d35e] bg-white">
            <p
              onClick={() => setShow(!show)}
              className={
                !show
                  ? "text-2xl font-bold  text-[#f4d35e] cursor-pointer hover:underline max-[425px]:text-base"
                  : "text-2xl font-bold   text-[#f4d35e] mb-2 cursor-pointer underline max-[425px]:text-base"
              }
            >
              Added to movie list{" "}
              {!show ? <span>({likedMovieList.length})</span> : ":"}
            </p>
            {show &&
              likedMovieList.map((movieListObj) => (
                <li
                  key={movieListObj.user_id}
                  className="flex justify-between items-center border border-white rounded px-2 mt-2 shadow-md"
                >
                  <div className="flex items-center gap-5 py-3">
                    {movieListObj.img_url ? (
                      <img
                        className="border border-white object-cover  w-10 h-10 rounded-full"
                        src={
                          baseBackendUrl +
                          (movieListObj.img_url !== ""
                            ? movieListObj.img_url
                            : "placeholder.webp")
                        }
                        alt="profile picture"
                      />
                    ) : (
                      <img className="userSvg py-2 " src={userSvg} alt="user" />
                    )}{" "}
                    <div>
                      <p>{movieListObj.userName}</p>
                      <p className="text-xs">{movieListObj.email}</p>
                    </div>
                  </div>
                  <div>
                    {movieListObj.user_id ===
                    followingList.find(
                      (follow) => follow.id === movieListObj.user_id
                    )?.id ? (
                      <button
                        onClick={() =>
                          handleUnfollow(
                            movieListObj.user_id,
                            movieListObj.userName
                          )
                        }
                        className="button  px-4 py-2 mt-2 mb-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        Unfollow
                      </button>
                    ) : movieListObj.user_id === userId ? (
                      <></>
                    ) : (
                      <button
                        onClick={() =>
                          handleFollow(
                            movieListObj.user_id,
                            movieListObj.userName,
                            movieListObj.email,
                            movieListObj.img_url
                          )
                        }
                        className="button px-4 py-2 mt-2 mb-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <Comments commentsList={commentsList} onDelete={handleCommentdelete} />
        <form onSubmit={formik.handleSubmit} className="mt-3" noValidate>
          <SmartInput
            id="comment"
            formik={formik}
            type="textarea"
            placeholder="Your Comment"
          />
          <button
            type="submit"
            className="button py-2 px-4  rounded focus:outline-none focus:shadow-outline max-[425px]:text-xs"
          >
            Post
          </button>
        </form>
        <div className="flex justify-center mb-5 gap-4 items-center buttons mt-3">
          <p
            className={
              !like
                ? "like text-[#1f271b] text-7xl cursor-pointer duration-1000 hover:text-[#28afb0]"
                : "like text-[#28afb0] text-7xl cursor-pointer duration-1000 hover:text-[#1f271b]"
            }
            onClick={() =>
              !like
                ? handleLike(movie.Plot, movie.Title, movie.Poster)
                : handleUnlike(movie.Title)
            }
          >
            ❤️
          </p>

          <Link
            to={"/movie-list"}
            className="button px-3 py-2 sm:px-5 sm:py-3 rounded shadow mt-2"
          >
            Back
          </Link>
        </div>

        {!movie && (
          <section className="flex justify-center items-center gap-5  max-[425px]:flex-col">
            <div className="w-6/12 max-[425px]:min-w-full">
              <div className=" min-h-96 rounded-2xl bg-teal-400 opacity-30  max-[425px]:min-h-72"></div>
            </div>
            <div className="w-6/12 max-[425px]:min-w-full">
              <div>
                <div className="min-h-10 bg-teal-400 mb-4 opacity-30 rounded-2xl max-[425px]:min-h-7"></div>
              </div>
              <div>
                <p className="min-h-4  bg-teal-400 mt-1 opacity-30 rounded-2xl max-[425px]:min-h-2"></p>
                <p className="min-h-4 bg-teal-400 mt-1 opacity-30 rounded-2xl max-[425px]:min-h-2"></p>

                <p className="min-h-4 bg-teal-400 mt-1 opacity-30 rounded-2xl max-[425px]:min-h-2"></p>
                <p className="min-h-4 bg-teal-400 mt-1 opacity-30 rounded-2xl max-[425px]:min-h-2"></p>
                <p className="min-h-4 bg-teal-400 mt-1 opacity-30 rounded-2xl max-[425px]:min-h-2"></p>
                <p className="min-h-4 bg-teal-400 mt-1 opacity-30 rounded-2xl max-[425px]:min-h-2"></p>
                <p className="mt-3 min-h-4 bg-teal-400 opacity-30 rounded-2xl max-[425px]:min-h-2"></p>
                <p className="min-h-4 bg-teal-400 mt-1 opacity-30 rounded-2xl max-[425px]:min-h-2"></p>
                <p className="min-h-4 bg-teal-400 mt-1 opacity-30 rounded-2xl max-[425px]:min-h-2"></p>
                <p className="mt-3 min-h-4 bg-teal-400 opacity-30 rounded-2xl max-[425px]:min-h-2"></p>
                <p className="min-h-4 bg-teal-400 mt-1 opacity-30 rounded-2xl max-[425px]:min-h-2"></p>
              </div>
              <div>
                <p className="mt-4 min-h-20 bg-teal-400 opacity-30 rounded-2xl max-[425px]:min-h-10"></p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default SingleMoviePage;
