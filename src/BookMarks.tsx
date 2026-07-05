import type { Country } from "./types";
import { type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
type CountryPageProps = {
  list: Country[];
  setList: Dispatch<SetStateAction<Country[]>>;
};

export default function BookMarks({ list, setList }: CountryPageProps) {
  const baseUrl = import.meta.env.BASE_URL;
  const navigate = useNavigate();

  return (
    <section className="w-full  py-12 sm:px-8  px-3 max-w-360 mx-auto">
      <div className="flex mb-6">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="cursor-pointer text-preset-4-light flex justify-center
          items-center gap-2
          py-2 px-8 dark:bg-blue-900 bg-gray-200 rounded"
        >
          <img
            className="dark:toWhite"
            src={`${baseUrl}arrow_back.svg`}
            alt=""
          />{" "}
          Back{" "}
        </button>
      </div>
      {list.length === 0 ? (
        <h3 className="text-center w-full text-preset-4-semibold">
          No Bookmarks Saved Yet
        </h3>
      ) : (
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-8 w-full  p-0 m-0 h-fit max-w-360"
          aria-label="List Of favorite Countries"
        >
          {list.map((item) => {
            return (
              <li
                key={item.name}
                className="relative bg-white p-0 m-0 dark:bg-blue-900 text-gray-950  min-h-70 w-65 h-fit dark:text-white shadow-md rounded-t-md flex flex-col text-left "
              >
                <button
                  className="cursor-pointer
                  bg-white rounded-full p-1
                  z-50 absolute top-1 right-1"
                  type="button"
                  aria-label={
                    list.some((country) => country.name === item.name)
                      ? `Remove ${item.name} from favorites`
                      : `Add ${item.name} to favorites`
                  }
                  aria-pressed={list.some(
                    (country) => country.name === item.name,
                  )}
                  onClick={() => {
                    setList((prev) =>
                      prev.filter((el) => el.name !== item.name),
                    );
                  }}
                >
                  <svg
                    className=""
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                    fill="#000000"
                  >
                    <path d="M240-120v-640q0-33 23.5-56.5T320-840h320q33 0 56.5 23.5T720-760v640L480-223 240-120Z" />
                  </svg>
                  <svg
                    className="hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 -960 960 960"
                    fill="#1f1f1f"
                  >
                    <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
                  </svg>
                </button>
                <button
                  className="cursor-pointer"
                  type="button"
                  onClick={() => {
                    navigate(`/country/${item.name}`);
                  }}
                >
                  <img
                    src={item.flags.png}
                    alt={`Flag of ${item.name}`}
                    className="w-full aspect-5/3  max-h-40 object-cover rounded-t-md"
                  />

                  <div
                    className="flex flex-col justify-center
                 gap-1
                h-fit p-4
                text-preset-5
                text-left
                "
                  >
                    <h2 className="text-preset-3 mb-2"> {item.name}</h2>
                    <p>
                      Population:
                      <span className="text-gray-700 dark:text-gray-400">
                        {" "}
                        {item.population}
                      </span>{" "}
                    </p>
                    <p>
                      Region:
                      <span className="text-gray-700 dark:text-gray-400">
                        {" "}
                        {item.region}
                      </span>
                    </p>
                    <p>
                      Capital:
                      <span className="text-gray-700 dark:text-gray-400">
                        {" "}
                        {item.capital}
                      </span>
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
