import { useEffect } from "react";
import type { Country } from "../types";

import { useParams, useNavigate } from "react-router-dom";
type CountryPageProps = {
  data: Country[];
  countryPage: Country | "";
  setCountryPage: (value: Country | "") => void;
};

export default function FlagPage({
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
    <section className="w-full py-12 px-8 max-w-360 mx-auto">
      <div className="flex ">
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

      <div className="flex max-w-7xl">
        {countryPage && (
          <img src={countryPage.flag} className="w-140 h-100" alt="" />
        )}
        <div className="flex">
          <h2>{name}</h2>
        </div>
      </div>
    </section>
  );
}
