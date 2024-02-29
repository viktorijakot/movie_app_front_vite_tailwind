// import { useNavigate } from "react-router-dom";
import SmartInput from "../components/UI/SmartInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import Card from "../components/UI/Card";
import Pagination from "../components/UI/Pagination";

function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [plot, setPlot] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  console.log("page ===", page);
  console.log("totalResults ===", +totalResults);
  // const navigate = useNavigate();
  console.log("movies ===", movies);

  const handlePages = (pageNumber) => {
    setPage(pageNumber);
    getAxiosData(formik.values.movie_title, page);
  };
  const formik = useFormik({
    initialValues: {
      movie_title: "",
    },
    validationSchema: Yup.object({
      movie_title: Yup.string().min(3).required(),
    }),
    onSubmit: (values) => {
      console.log("values ===", values);
      getAxiosData(values.movie_title);
    },
  });

  const getAxiosData = (data) => {
    axios
      .get(`https://www.omdbapi.com/?apikey=96949423&s=${data}&page=${page}`)
      .then((resp) => {
        setMovies(resp.data.Search);
        setTotalResults(resp.data.totalResults);
        // formik.resetForm;
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleMove = (id) => {
    axios
      .get(`https://www.omdbapi.com/?apikey=96949423&i=${id}`)
      .then((resp) => {
        console.log("resp ===", resp);
        setPlot(resp.data.Plot);
        console.log("movies ===", plot);
      })
      .catch((error) => {
        console.log("error axios plot ===", error);
      });
  };
  return (
    <div className="container min-h-screen flex justify-center">
      <div className="movieCont w-full mt-28 mb-10">
        <form onSubmit={formik.handleSubmit}>
          <SmartInput id="movie_title" formik={formik} type="text" />
          <button
            type="submit"
            className="button px-4 py-2 mt-5 rounded focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </form>
        <Pagination
          page={page}
          totalResults={totalResults}
          handlePages={handlePages}
        />
        <div className="result grid grid-cols-4 gap-4 mt-5 max-[425px]:grid-cols-1 max-[768px]:grid-cols-2 max-[1024px]:grid-cols-3">
          {movies &&
            movies.map((movie) => {
              return (
                <div
                  key={movie.imdbID}
                  onMouseEnter={() => handleMove(movie.imdbID)}
                >
                  <Card
                    title={movie.Title}
                    imgSrc={
                      movie.Poster === "N/A"
                        ? "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"
                        : movie.Poster
                    }
                    description={plot}
                    button={"Read more"}
                    link={`/movie-list/${movie.imdbID}`}
                    movieId={movie.imdbID}
                  />
                </div>
              );
            })}
        </div>
        <Pagination
          page={page}
          totalResults={totalResults}
          handlePages={handlePages}
        />
      </div>
    </div>
  );
}

export default MoviesPage;
