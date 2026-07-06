import {
  useEffect,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Country } from "../types";
import { useNavigate, useSearchParams } from "react-router-dom";

interface MainProps {
  list: Country[];
  setList: Dispatch<SetStateAction<Country[]>>;

  data: Country[];
  searchTerm: string;
  searchRegion: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setSearchRegion: Dispatch<SetStateAction<string>>;
}
export default function Main({
  data,
  searchTerm,
  searchRegion,
  setSearchTerm,
  setSearchRegion,
  list,
  setList,
}: MainProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleFavorite(item: Country): void {
    setList((prev) => {
      const exists = prev.some((country) => country.name === item.name);

      if (exists) {
        return prev.filter((country) => country.name !== item.name);
      }

      return [...prev, item];
    });
  }

  const filteredCountries = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((item) => searchRegion === "" || item.region === searchRegion);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") ?? "");
  }, [searchParams, setSearchTerm]);
  return (
    <>
      <div className="mt-8 flex w-full flex-col gap-10 md:flex-row  sm:px-12  px-4 items-center  md:justify-between max-w-360">
        <div className="relative w-full max-w-100">
          <label htmlFor="country-search" className="sr-only">
            Search for a country
          </label>
          <svg
            className="absolute left-8 top-1/2 h-5 w-5 -translate-y-1/2  dark:text-grey-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.5 3a5.5 5.5 0 1 0 3.47 9.77l3.63 3.63 1.06-1.06-3.63-3.63A5.5 5.5 0 0 0 8.5 3Zm-4 5.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            id="country-search"
            type="search"
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(e.target.value);
              setSearchParams({
                search: e.target.value,
              });
            }}
            placeholder="Search for a country..."
            className="text-preset-4-semibold h-14 w-full rounded-md bg-white dark:bg-blue-900 pl-16 pr-4 shadow-md  border-none placeholder:text-grey-400"
          />
        </div>

        <div className="relative w-65 max-w-full">
          <label htmlFor="region-filter" className="sr-only">
            Filter countries by region
          </label>
          <select
            id="region-filter"
            className="text-preset-4-semibold h-14 w-full appearance-none rounded-md bg-white px-6 pr-12 shadow-md  
              border-none
            dark:bg-blue-900
            cursor-pointer"
            value={searchRegion}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSearchRegion(e.target.value)
            }
          >
            <option value="" className="cursor-pointer">
              Filter by Region
            </option>
            <option value="Africa" className="hover:bg-gray-500">
              Africa
            </option>
            <option className="hover:bg-gray-500">Americas</option>
            <option value="Asia" className="hover:bg-gray-500">
              Asia
            </option>
            <option value="Europe" className="hover:bg-gray-500">
              Europe
            </option>
            <option value="Oceania" className="hover:bg-gray-500">
              Oceania
            </option>
          </select>

          <svg
            className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {filteredCountries.length === 0 ? (
        <h3 className="text-center w-full text-preset-1 mt-6">No Results</h3>
      ) : (
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-8 w-full p-0 m-0 h-fit max-w-360"
          aria-label="List Of All Countries"
        >
          {filteredCountries.map((item) => {
            return (
              <li
                key={item.name}
                className="relative bg-white p-0 m-0 dark:bg-blue-900 text-gray-950 min-h-70 w-65 h-fit dark:text-white shadow-md rounded-t-md flex flex-col text-left"
              >
                <button
                  type="button"
                  aria-label={
                    list.some((country) => country.name === item.name)
                      ? `Remove ${item.name} from favorites`
                      : `Add ${item.name} to favorites`
                  }
                  aria-pressed={list.some(
                    (country) => country.name === item.name,
                  )}
                  onClick={() => handleFavorite(item)}
                  className="bg-white rounded-full cursor-pointer p-1 z-50 absolute top-1 right-1"
                >
                  <svg
                    className={
                      list.some((country) => country.name === item.name)
                        ? ""
                        : "hidden"
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                    fill="#000000"
                  >
                    <path d="M240-120v-640q0-33 23.5-56.5T320-840h320q33 0 56.5 23.5T720-760v640L480-223 240-120Z" />
                  </svg>

                  <svg
                    className={
                      list.some((country) => country.name === item.name)
                        ? "hidden"
                        : ""
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 -960 960 960"
                    fill="#1f1f1f"
                  >
                    <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
                  </svg>
                </button>

                <button
                  className="cursor-pointer"
                  type="button"
                  onClick={() => navigate(`/country/${item.name}`)}
                >
                  <img
                    src={item.flags.png}
                    alt={`Flag of ${item.name}`}
                    className="w-full aspect-5/3 max-h-40 object-cover rounded-t-md"
                  />

                  <div className="flex flex-col justify-center gap-1 h-fit p-4 text-preset-5 text-left">
                    <h2 className="text-preset-3 mb-2">{item.name}</h2>

                    <p>
                      Population:
                      <span className="text-gray-700 dark:text-gray-400">
                        {" "}
                        {item.population}
                      </span>
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
    </>
  );
}
