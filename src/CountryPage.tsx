import { useEffect } from "react";
import type { Country } from "./types";

import { useParams, useNavigate } from "react-router-dom";
type CountryPageProps = {
  data: Country[];
  countryPage: Country | "";
  setCountryPage: (value: Country | "") => void;
};

export default function CountryPage({
  data,
  countryPage,
  setCountryPage,
}: CountryPageProps) {
  const baseUrl = import.meta.env.BASE_URL;
  const navigate = useNavigate();
  const { name } = useParams();

  useEffect(() => {
    const country = data.find((item) => item.name === name) ?? "";
    setCountryPage(country);
  }, [data, name, setCountryPage]);

  return (
    <section className="w-full  py-12 sm:px-8  px-3 max-w-360 mx-auto">
      <div className="flex mb-6">
        <button
          onClick={() => {
            setCountryPage("");
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

      <div className="flex custom:justify-center custom:items-start items-center flex-col custom:flex-row max-w-7xl pt-4 gap-16 ">
        {countryPage && (
          <div className="max-w-140">
            <img
              src={countryPage.flag}
              className="object-cover aspect-5/3 w-full"
              alt=""
            />
          </div>
        )}
        <div className="flex justify-center flex-col items-center gap-6   max-w-140 w-full">
          {countryPage && (
            <>
              <h2 className="text-preset-1 dark:text-white text-gray-950 text-left w-full ">
                {countryPage.name}
              </h2>
              <div className="grid sm:grid-cols-2  grid-cols-1   sm:gap-4 w-full">
                <div className="block">
                  <p className="text-preset-4-light">
                    <span className="text-preset-4-semibold">Native name:</span>{" "}
                    {countryPage.nativeName}
                  </p>
                  <p className="text-preset-4-light">
                    <span className="text-preset-4-semibold">Population:</span>{" "}
                    {countryPage.population}
                  </p>
                  <p className="text-preset-4-light">
                    <span className="text-preset-4-semibold">Region:</span>{" "}
                    {countryPage.region}
                  </p>
                  <p className="text-preset-4-light">
                    <span className="text-preset-4-semibold">Sub Region:</span>{" "}
                    {countryPage.subregion}
                  </p>
                  <p className="text-preset-4-light">
                    <span className="text-preset-4-semibold">Capital:</span>{" "}
                    {countryPage.capital}
                  </p>
                </div>
                <div className=" block">
                  <p className="text-preset-4-light">
                    <span className="text-preset-4-semibold">
                      Top Level Domain:
                    </span>{" "}
                    {countryPage.topLevelDomain}
                  </p>
                  <p className="text-preset-4-light">
                    <span className="text-preset-4-semibold">Currencies:</span>{" "}
                    {countryPage.currencies.map((item) => item.name).join(", ")}
                  </p>
                  <p className="text-preset-4-light">
                    <span className="text-preset-4-semibold">Languages:</span>{" "}
                    {countryPage.languages.map((item) => item.name).join(", ")}
                  </p>
                </div>
              </div>
            </>
          )}
          <div className="flex sm:flex-row w-full justify-start  flex-col gap-4 ">
            {countryPage && countryPage.borders && (
              <>
                <strong className=" pt-1 w-full max-w-[140px]">
                  Borders Countries:
                </strong>
                <ul className="flex flex-wrap items-start justify-start gap-4 max-w-[400px]">
                  {countryPage.borders.map((border) => {
                    const country = data.find(
                      (country) => country.alpha3Code === border,
                    );
                    return (
                      <li
                        className="text-preset-4-light rounded bg-white px-1.5 dark:bg-blue-900"
                        key={border}
                      >
                        {country?.name}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
