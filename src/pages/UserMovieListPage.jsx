import { useMemo, useState } from "react";
import { URL_BASE } from "../components/helper";
import useGetApiData from "../hooks/useGetApiData";
import { useAuthContext } from "../store/AuthCtxProvider";

function UserMovieListPage() {
  const { userId } = useAuthContext();
  const [moviesList, setMoviesList] = useGetApiData(
    `${URL_BASE}/myMoviesList/${userId}`
  );
  const [filterValue, setFilterValue] = useState("");
  console.log("moviesList ===", moviesList);

  const filteredMovies = useMemo(() => {
    return moviesList.filter((movie) =>
      movie.title.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [moviesList, filterValue]);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };
  return (
    <div className="container min-h-screen ">
      <div className="mt-28 mb-20">
        <div className="mt-5">
          <input
            className="w-full px-3 py-2 border mb-5 border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            value={filterValue}
            onChange={handleFilterChange}
            placeholder="Search Movie"
          />
        </div>
        {moviesList &&
          filteredMovies.map((movieObj) => {
            return (
              <div
                key={movieObj.movie_id}
                className="w-full modal_box mb-5 px-4 lg:px-16 max-[768px]:mt-5"
              >
                <div className="flex justify-start  max-[425px]:flex-col">
                  <div className="max-[425px]:flex max-[425px]:justify-center">
                    <img
                      className="w-4/6"
                      src={movieObj.imgUrl}
                      alt={movieObj.title}
                    />
                  </div>
                  <div className="w-11/12 max-[425px]:w-full">
                    <h1 className="font-bold text-lg max-[425px]:text-base max-[425px]:text-center max-[425px]:mt-5">
                      {movieObj.title}
                    </h1>
                    <p className="mt-5 max-[425px]:text-sm">
                      {movieObj.description}
                    </p>
                    <p className="font-bold mt-5 max-[425px]:text-sm">
                      Friends comments:
                    </p>
                    <p className="font-bold mt-5 max-[425px]:text-sm">
                      Friends rating:
                    </p>
                    <p className="font-bold mt-5 max-[425px]:text-sm">
                      Added to movie list:
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default UserMovieListPage;
