type HeaderProps = {
  dark: boolean;
  setDark: (value: boolean | ((prev: boolean) => boolean)) => void;
};

export default function Header({ dark, setDark }: HeaderProps) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <header className="dark:bg-blue-900 shadow-lg border-gray-200 border-b ">
      <nav className="max-w-360 mx-auto flex justify-between items-center  sm:px-14  px-4 py-8  text-gray-950   ">
        <a href={baseUrl}>
          <h1 className="sm:text-preset-2  text-preset-5 dark:text-white">
            Where in the world
          </h1>
        </a>
        <button
          className="flex  items-center gap-2 cursor-pointer"
          type="button"
          onClick={() => setDark((prev) => !prev)}
        >
          <img
            className="sm:w-8 sm:h-8 h-5 w-5"
            src={`${baseUrl}${dark ? "sun-light33.png" : "dark-moon2.png"}`}
            alt=""
          />
          <span className=" sm:text-preset-4-semibold dark:text-white text-gray-950 text-preset-6-semibold">
            {dark ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
      </nav>
    </header>
  );
}
