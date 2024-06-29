import { NavLink } from "react-router-dom";
// import { hamburger } from "../../public/assets/icons";

export const Nav = ({ mobileNav, setMobileNav }) => {
  function handleClick() {
    setMobileNav(!mobileNav);
  }

  return (
    <section className="font-supreme">
      <nav className="max-sm:px-5 fixed top-0 left-0 right-0 z-10 flex items-center justify-between py-4 px-10 ma bg-[#0f0e17] text-[#fffffe] max-md:text-[#0f0e17]">
        <span className="text-3xl max-sm:text-xl">
          <NavLink to="/">
            <div className="flex text-[#f25f4c]">
              <span>G</span>
              <span className="flex items-center justify-center">
                <ion-icon name="game-controller-outline"></ion-icon>
              </span>
              <span>MER</span>
            </div>
          </NavLink>
        </span>
        <ul className="flex gap-16 text-xl max-md:hidden">
          <li className="hover:text-[#f25f4c] transition-all duration-300">
            <NavLink to="/games">Games</NavLink>
          </li>
          <li className="hover:text-[#f25f4c] transition-all duration-300">
            <NavLink to="/genres">Genres</NavLink>
          </li>
          <li className="hover:text-[#f25f4c] transition-all duration-300">
            <NavLink to="/creators">Creators</NavLink>
          </li>
          <li className="hover:text-[#f25f4c] transition-all duration-300">
            <NavLink to="/stores"> Stores </NavLink>
          </li>
        </ul>
        <div className="hidden cursor-pointer max-md:block">
          {/* <img
            src={hamburger}
            alt="hamburger menu"
            height={25}
            width={25}
            className=""
            onClick={handleClick}
          /> */}
          <ion-icon
            onClick={handleClick}
            size="large"
            name="menu-outline"
          ></ion-icon>
        </div>
      </nav>

      <div>
        <nav
          id="mobile-nav"
          className={`relative text-[#fffffe] ${
            mobileNav ? "block" : "hidden"
          }`}
          onClick={handleClick}
        >
          <div className="absolute inset-0 bg-[#0f0e17]"></div>
          <ul className="relative flex flex-col items-center min-h-screen justify-center pb-[100px] gap-16 text-3xl max-sm:text-xl max-sm:pb-[300px]">
            <li className="hover:text-[#f25f4c] transition-all duration-300">
              <NavLink to="/games">Games</NavLink>
            </li>

            <li className="hover:text-[#f25f4c] transition-all duration-300">
              <NavLink to="/genres">Genres</NavLink>
            </li>
            <li className="hover:text-[#f25f4c] transition-all duration-300">
              <NavLink to="/creators">Creators</NavLink>
            </li>
            <li className="hover:text-[#f25f4c] transition-all duration-300">
              <NavLink to="/stores"> Stores </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};
