import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "../UI/AppLayout";
import { Games } from "../Pages/Games";
import { Game } from "../Pages/Game";
import { Creators } from "../Pages/Creators";
import { Stores } from "../Pages/Stores";
import { Error } from "../Pages/Error";
import { Hero } from "../Pages/Hero";
import { GameLayout } from "../UI/GameLayout";
import { PCRequirements } from "../Pages/PCRequirements";
import { GameStores } from "../Pages/GameStores";
import { Genres } from "../Pages/Genres";

export const AppRouter = () => {
  return (
    <BrowserRouter basename="/Gamer">
      {" "}
      {/* Set the basename to your repository name */}
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Hero />} />
          <Route path="games" element={<Games />} />
          <Route path="genres" element={<Genres />} />
          <Route path="genres/:gameId" element={<Game />}>
            <Route element={<GameLayout />}>
              <Route index element={<PCRequirements />} />
              <Route path="gameStores" element={<GameStores />} />
            </Route>
          </Route>
          <Route path="games/:gameId" element={<Game />}>
            <Route element={<GameLayout />}>
              <Route index element={<PCRequirements />} />
              <Route path="gameStores" element={<GameStores />} />
            </Route>
          </Route>
          <Route path="creators" element={<Creators />} />
          <Route path="stores" element={<Stores />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
