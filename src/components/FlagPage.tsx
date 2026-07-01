import React from "react";

import type { Country } from "../types";

type FlagPageProps = {
  flag: Country;
};

export default function FlagPage({ flag }: FlagPageProps) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section className="w-full py-12 px-8">
      <div className="flex">
        <a
          href=""
          className=" text-preset-4-light flex justify-center
          items-center gap-2
          py-2 px-8 dark:bg-blue-900 bg-gray-200 rounded"
        >
          <img
            className="dark:toWhite"
            src={`${baseUrl}arrow_back.svg`}
            alt=""
          />{" "}
          Back{" "}
        </a>
      </div>

      <div className="flex">
        <img src={flag.flag} className="w-140 h-100" alt="" />
      </div>
    </section>
  );
}
