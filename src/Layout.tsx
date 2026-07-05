import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import type { HeaderProps } from "./components/Header";

export default function Layout({ dark, setDark }: HeaderProps) {
  return (
    <>
      <Header dark={dark} setDark={setDark} />
      <main
        className="

      min-h-screen dark:text-white flex flex-col gap-6 justify-start items-center dark:bg-blue-950 bg-gray-100"
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
