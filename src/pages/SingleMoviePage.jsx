import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../store/AuthCtxProvider";
import toast from "react-hot-toast";
import { URL_BASE } from "../components/helper";
import SmartInput from "../components/UI/SmartInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import Comments from "./comments/Comments";
import useGetApiData from "../hooks/useGetApiData";

function SingleMoviePage() {
  const [movie, setMovie] = useState();
  const { id } = useParams();
  const { token, userName, email, userId, imgUrl } = useAuthContext();
  const [like, setLike] = useState(false);
  const [commentsList, setCommentsList] = useGetApiData(
    `${URL_BASE}comments/${id}`
  );

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

  const handleLike = (description, title, imgUrl) => {
    const data = {
      movieId: id,
      description,
      title,
      imgUrl,
    };
    setLike(true);
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

  const handleUnlike = (title) => {
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
            comment: values.comment,
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
  return (
    <div className="container min-h-screen flex justify-center">
      <div className="movieSingle  w-full mt-28 mb-24  modal_box px-4 lg:px-16 ">
        {movie && (
          <section className="flex justify-center items-center max-[425px]:flex-col">
            <div className="w-6/12 max-[425px]:min-w-full">
              <img
                className="min-w-max rounded-2xl max-[425px]:min-w-full"
                src={movie.Poster}
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
        <Comments commentsList={commentsList} onDelete={handleCommentdelete} />
        <form onSubmit={formik.handleSubmit} className="mt-10" noValidate>
          <SmartInput
            id="comment"
            formik={formik}
            type="textarea"
            placeholder="Your Comment"
          />
          <button
            type="submit"
            className="button py-2 px-4  rounded focus:outline-none focus:shadow-outline"
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
