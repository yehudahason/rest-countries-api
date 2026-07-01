import type { Country } from "../types";

type FlagPageProps = {
  flag: Country;
  setFlagPage: (value: Country | "") => void;
};

export default function FlagPage({ flag, setFlagPage }: FlagPageProps) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section className="w-full py-12 px-8 max-w-360 mx-auto">
      <div className="flex ">
        <button
          onClick={() => setFlagPage("")}
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
        <img src={flag.flag} className="w-140 h-100" alt="" />
      </div>
    </section>
  );
}
