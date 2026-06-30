type HeaderProps = {
  dark: boolean;
  setDark: (value: boolean | ((prev: boolean) => boolean)) => void;
};

export default function Header({ dark, setDark }: HeaderProps) {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <header className="flex justify-between items-center py-8 px-8 dark:bg-blue-900 text-gray-950 shadow-sm">
      <h1 className="text-preset-2 dark:text-white">Where in the world</h1>
      <button
        className="flex items-center gap-2"
        type="button"
        onClick={() => setDark((prev) => !prev)}
      >
        <img
          className="w-8 h-8"
          src={`${baseUrl}${dark ? "sun-light33.png" : "dark-moon2.png"}`}
          alt=""
        />
        <span className=" text-preset-4-semibold dark:text-white text-gray-950">
          {dark ? "Light Mode" : "Dark Mode"}
        </span>
      </button>
    </header>
  );
}
