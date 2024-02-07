import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleMoviePage() {
  const [movie, setMovie] = useState();
  const { id } = useParams();

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
  console.log("movie ===", movie);
  return (
    <div className="container mx-auto w- mt-32 mb-24 modal_box px-4 md:px-16 ">
      {movie && (
        <section className="flex justify-center items-center ">
          <div className="w-6/12">
            <img
              className="min-w-max rounded-2xl"
              src={movie.Poster}
              alt="poster"
            />
          </div>
          <div className="w-6/12">
            <div>
              <h1 className="text-3xl pb-4 ">{movie.Title}</h1>
            </div>
            <div>
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
            <div>
              {movie.Ratings.map((rating, index) => {
                return (
                  <p key={index}>
                    <strong>{rating.Source}:</strong> {rating.Value}
                  </p>
                );
              })}
            </div>
            <div>
              <p className="pt-4">{movie.Plot}</p>
            </div>
          </div>
        </section>
      )}
      {!movie && (
        <section className="flex justify-center items-center gap-5 ">
          <div className="w-6/12">
            <div className=" min-h-96 rounded-2xl bg-teal-400 opacity-30"></div>
          </div>
          <div className="w-6/12">
            <div>
              <div className="min-h-10 bg-teal-400 mb-4 opacity-30 rounded-2xl"></div>
            </div>
            <div>
              <p className="min-h-4  bg-teal-400 mt-1 opacity-30 rounded-2xl"></p>
              <p className="min-h-4 bg-teal-400 mt-1 opacity-30 rounded-2xl"></p>

              <p className="min-h-4 bg-teal-400 mt-1 opacity-30 rounded-2xl"></p>
              <p className="min-h-4 bg-teal-400 mt-1 opacity-30 rounded-2xl"></p>
              <p className="min-h-4 bg-teal-400 mt-1 opacity-30 rounded-2xl"></p>
              <p className="min-h-4 bg-teal-400 mt-1 opacity-30 rounded-2xl"></p>
              <p className="mt-3 min-h-4 bg-teal-400 opacity-30 rounded-2xl"></p>
              <p className="min-h-4 bg-teal-400 mt-1 opacity-30 rounded-2xl"></p>
              <p className="min-h-4 bg-teal-400 mt-1 opacity-30 rounded-2xl"></p>
              <p className="mt-3 min-h-4 bg-teal-400 opacity-30 rounded-2xl"></p>
              <p className="min-h-4 bg-teal-400 mt-1 opacity-30 rounded-2xl"></p>
            </div>
            <div>
              <p className="mt-4 min-h-20 bg-teal-400 opacity-30 rounded-2xl"></p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default SingleMoviePage;
