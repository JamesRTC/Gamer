import { Link, NavLink } from "react-router-dom";
import { getCurrentYear } from "../utilities/helper";

export const Footer = () => {
  return (
    <div className=" bg-black text-white px-10 max-sm:px-3 max-sm:text-sm py-5 flex flex-col gap-2 pt-5 font-supreme">
      <div className="flex items-center justify-between">
        <div>
          <Link link to="/">
            GAMER
          </Link>
        </div>
        <div className="flex gap-5">
          <div>
            <ion-icon name="logo-facebook"></ion-icon>
          </div>
          <div>
            <ion-icon name="logo-instagram"></ion-icon>
          </div>
          <div>
            <ion-icon name="logo-twitter"></ion-icon>
          </div>
          <div>
            <ion-icon name="logo-discord"></ion-icon>
          </div>
        </div>
      </div>

      <div className="flex justify-between max-md:flex-col max-md:gap-2">
        <nav>
          <ul className="flex gap-5 max-md:gap-3">
            <li className="hover:text-[#f25f4c] transition-all duration-300">
              <NavLink to="/games">Games</NavLink>
            </li>
            |
            <li className="hover:text-[#f25f4c] transition-all duration-300">
              <NavLink to="/genres">Platforms</NavLink>
            </li>
            |
            <li className="hover:text-[#f25f4c] transition-all duration-300">
              <NavLink to="/genres">Genres</NavLink>
            </li>
            |
            <li className="hover:text-[#f25f4c] transition-all duration-300">
              <NavLink to="/creators">Creators</NavLink>
            </li>
            |
            <li className="hover:text-[#f25f4c] transition-all duration-300">
              <NavLink to="/stores"> Stores </NavLink>
            </li>
          </ul>
        </nav>

        <div>Copyright &copy; {getCurrentYear()} gamer.com</div>
      </div>
    </div>
  );
};
