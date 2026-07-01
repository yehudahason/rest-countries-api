import { useQuery } from "@tanstack/react-query";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import type { Country } from "./types";
export default function App() {
  const baseUrl = import.meta.env.BASE_URL;
  const [dark, setDark] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchRegion, setSearchRegion] = useState<string>("");

  const { isPending, error, data } = useQuery<Country[]>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}data.json`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    },
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  if (isPending) return "Loading...";

  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      <Header dark={dark} setDark={setDark} />
      <main className="h-full min-h-screen dark:text-white flex flex-col gap-6 justify-start items-center dark:bg-blue-950 bg-gray-100">
        <div className="mt-8 flex w-full flex-col gap-10 md:flex-row sm:px-10  px-3 items-center  md:justify-between">
          <div className="relative w-full max-w-80">
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
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a country..."
              className="text-preset-5 h-14 w-full rounded-md bg-white dark:bg-blue-900 pl-16 pr-4 shadow-md  border-none placeholder:text-grey-400"
            />
          </div>

          <div className="relative w-65 max-w-full">
            <label htmlFor="region-filter" className="sr-only">
              Filter countries by region
            </label>
            <select
              id="region-filter"
              className="text-preset-5 h-14 w-full appearance-none rounded-md bg-white px-6 pr-12 shadow-md  
              border-none
            dark:bg-blue-900
            cursor-pointer"
              value={searchRegion}
              onChange={(e) => setSearchRegion(e.target.value)}
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
              <option value="" className="hover:bg-gray-500">
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
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-7 w-full lg:px-20 p-0 m-0 h-fit">
          {data
            ?.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .filter((item) => {
              if (searchRegion === "") return true;
              else return item.region === searchRegion;
            })
            .map((item) => {
              return (
                <li
                  key={item.name}
                  className="bg-white p-0 m-0 dark:bg-blue-900 text-gray-950  w-[224px] h-[310px] dark:text-white shadow-md rounded-t-md flex flex-col text-left "
                >
                  <img
                    src={item.flags.png}
                    alt={`Flag of ${item.name}`}
                    className="w-full max-h-[160px] object-cover rounded-t-md"
                  />

                  <div
                    className="flex flex-col justify-center
                 gap-1
                h-full p-4
                text-preset-5
                "
                  >
                    <h2 className="text-preset-3 mb-5"> {item.name}</h2>
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
                </li>
              );
            })}
        </ul>
      </main>
    </>
  );
}
