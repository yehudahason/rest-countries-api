import { useEffect } from "react";
import type { Country } from "../types";

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
    <section className="w-full  py-12 px-8 max-w-360 mx-auto">
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

      <div className="flex justify-center items-center flex-col lg:flex-row max-w-7xl gap-9 ">
        {countryPage && (
          <div className="lg:w-140">
            <img
              src={countryPage.flag}
              className="object-cover aspect-5/3 w-full"
              alt=""
            />
          </div>
        )}
        <div className="flex p-6 border border-amber-800 lg:w-140 w-full">
          {countryPage && (
            <div className="flex flex-col">
              <h2>{countryPage.name}</h2>
              <p>{countryPage.nativeName}</p>
              <p>{countryPage.population}</p>
              <p>{countryPage.region}</p>
              <p>{countryPage.subregion}</p>
              <p>{countryPage.capital}</p>
              <p>{countryPage.topLevelDomain}</p>
              <p>
                {countryPage.currencies.map((item) => item.name).join(", ")}
              </p>
              <p>{countryPage.languages.map((item) => item.name).join(", ")}</p>
            </div>
          )}
          <ul>
            {countryPage && countryPage.borders && (
              countryPage.borders.map((border) => {
                const country = data.find(
                  (country) => country.alpha3Code === border,
                );
                return (
                  <li key={border}>{country?.name},</li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
