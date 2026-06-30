import { useQuery } from "@tanstack/react-query";
import Header from "./components/Header";
import { useState, useEffect } from "react";
export default function App() {
  const [dark, setDark] = useState<boolean>(false);
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
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
      <main className="h-screen dark:text-white flex flex-col gap-6 justify-start items-center dark:bg-blue-950">
        <div className="mt-8 flex w-full flex-col gap-10 md:flex-row sm:px-10  px-3 items-center  md:justify-between">
          <div className="relative w-full max-w-80">
            <svg
              className="absolute left-8 top-1/2 h-5 w-5 -translate-y-1/2  dark:text-grey-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8.5 3a5.5 5.5 0 1 0 3.47 9.77l3.63 3.63 1.06-1.06-3.63-3.63A5.5 5.5 0 0 0 8.5 3Zm-4 5.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
                clip-rule="evenodd"
              />
            </svg>

            <input
              type="search"
              placeholder="Search for a country..."
              className="text-preset-5 h-14 w-full rounded-md bg-white dark:bg-blue-900 pl-16 pr-4 shadow-md outline-none border-none placeholder:text-grey-400"
            />
          </div>

          <div className="relative w-65 max-w-full">
            <select
              className="text-preset-5 h-14 w-full appearance-none rounded-md bg-white px-6 pr-12 shadow-md outline-none 
              border-none
            dark:bg-blue-900
            cursor-pointer"
            >
              <option value="">Filter by Region</option>
              <option>Africa</option>
              <option>Americas</option>
              <option>Asia</option>
              <option>Europe</option>
              <option>Oceania</option>
            </select>

            <svg
              className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-amber-700 w-full h-[500px]"></div>
      </main>
    </>
  );
}
