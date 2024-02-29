import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({ page, totalResults, handlePages }) => {
  let resultsArray = [];

  for (let i = 0; i < Math.ceil(+totalResults / 10); i++) {
    resultsArray.push(i + 1);
  }
  return (
    <div className="flex w-full justify-center mt-5">
      {page > 1 ? (
        <ChevronLeftIcon
          onClick={() => handlePages(page - 1)}
          className="mx-1 px-3 py-1 h-10 rounded-full bg-[#f4d35e] text-[#1f271b] max-[425px]:bg-inherit max-[425px]:mx-0 max-[425px]:w-5 max-[425px]:px-0"
        />
      ) : (
        <ChevronLeftIcon className="mx-1 px-3 py-1 h-10 rounded-full bg-[#f4d35e] opacity-50 text-[#1f271b] max-[425px]:hidden" />
      )}
      {resultsArray.map(
        (pages, index) =>
          pages < page + 6 &&
          pages > page - 6 && (
            <button
              key={index}
              className={`mx-1 px-3 py-1 h-10 w-10 rounded-full max-[425px]:mx-0 max-[425px]:px-0 max-[425px]:bg-inherit max-[425px]:text-xs  ${
                page === index + 1
                  ? "bg-[#1f271b] text-white"
                  : "bg-[#f4d35e] text-[#1f271b]"
              }`}
              onClick={() => handlePages(index + 1)}
            >
              {index + 1}
            </button>
          )
      )}
      {resultsArray.length !== page ? (
        <ChevronRightIcon
          onClick={() => handlePages(page + 1)}
          className="mx-1 px-3 py-1 h-10 rounded-full bg-[#f4d35e] text-[#1f271b] max-[425px]:bg-inherit max-[425px]:mx-0 max-[425px]:w-5 max-[425px]:px-0"
        />
      ) : (
        <ChevronRightIcon className="mx-1 px-3 py-1 h-10 rounded-full bg-[#f4d35e] opacity-50 text-[#1f271b] max-[425px]:hidden" />
      )}
    </div>
  );
};

export default Pagination;
