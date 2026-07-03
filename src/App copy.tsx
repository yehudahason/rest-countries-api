import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import Main from "./components/Main";
import type { Country } from "./types";
import FlagPage from "./components/CountryPage";
export default function App() {
  const [dark, setDark] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchRegion, setSearchRegion] = useState<string>("");
  const [flagPage, setFlagPage] = useState<Country | "">("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <>
      <Header dark={dark} setDark={setDark} />
      <main
        className="
      
      min-h-screen dark:text-white flex flex-col gap-6 justify-start items-center dark:bg-blue-950 bg-gray-100"
      >
        {!flagPage ? (
          <Main
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setSearchRegion={setSearchRegion}
            searchRegion={searchRegion}
            setFlagPage={setFlagPage}
          />
        ) : (
          <FlagPage flag={flagPage} setFlagPage={setFlagPage} />
        )}
      </main>
      <Footer />
    </>
  );
}
