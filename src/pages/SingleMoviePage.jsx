import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../store/AuthCtxProvider";
import toast from "react-hot-toast";
import { URL_BASE } from "../components/helper";

function SingleMoviePage() {
  const [movie, setMovie] = useState();
  const { id } = useParams();
  const { token } = useAuthContext();

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
    <div className="container movieSingle mx-auto w- mt-32 mb-24 lg:w-10/12 md:w-11/12 xl:w-10/12 modal_box px-4 lg:px-16 ">
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
      <div className="flex justify-center gap-4 items-center buttons mt-3">
        <p
          className="like"
          onClick={() => handleLike(movie.Plot, movie.Title, movie.Poster)}
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
  );
}

export default SingleMoviePage;
