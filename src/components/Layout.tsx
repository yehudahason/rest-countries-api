import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import type { HeaderProps } from "./Header";

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
