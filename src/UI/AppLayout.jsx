import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../Pages/Footer";
import { Nav } from "./Nav";
import { useState } from "react";

export const AppLayout = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const location = useLocation();

  const homePath = "/";

  return (
    <>
      <Nav mobileNav={mobileNav} setMobileNav={setMobileNav} />

      <main className={`${mobileNav ? "hidden" : "block"}`}>
        <Outlet />
      </main>

      <footer
        className={`${mobileNav ? "hidden" : "block"} ${
          location.pathname === homePath ? "hidden" : "block"
        }`}
      >
        <Footer />
      </footer>
    </>
  );
};
