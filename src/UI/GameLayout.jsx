import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";

export const GameLayout = () => {
  const location = useLocation();
  const { gameId } = useParams();

  const pcRequirementsPath = `/games/${gameId}`;
  const gameStoresPath = `/games/${gameId}/gameStores`;

  return (
    <>
      <nav className="border-b py-3">
        <ul className="flex items-center mb">
          <li
            className={`${
              location.pathname === pcRequirementsPath
                ? "bg-[#f25f4c] text-gray-900"
                : "text-gray-100"
            } border font-semibold p-2 mr-1 uppercase hover:bg-[#f25f4c] transition-all duration-300`}
          >
            <NavLink to="" end>
              PC Requirements
            </NavLink>
          </li>
          <li
            className={`${
              location.pathname === gameStoresPath
                ? "bg-[#f25f4c] text-gray-900"
                : "text-gray-100"
            } border font-semibold p-2 uppercase transition-all duration-300 hover:bg-[#f25f4c] `}
          >
            <NavLink to="gameStores">Stores</NavLink>
          </li>
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
};
