import { useQuery } from "@tanstack/react-query";
import { fetchGame } from "../API/api";
import { star } from "../../public/assets/icons";
import { Link } from "react-router-dom";
import { Spinner } from "./Spinner";

export const GameItem = ({ gameId }) => {
  const { isLoading, data: game } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => fetchGame(gameId),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (isLoading) return <Spinner />;

  if (!game) return null;

  console.log(game);
  return (
    <div className="bg-gray-700 rounded-md text-[#fffffe] p-2 h-full">
      <Link to={`/genres/${gameId}`}>
        <div className="flex flex-col h-full ">
          <div className="flex flex-col flex-grow">
            <div className="relative w-full h-0 pb-[56.25%] hover:border-e-4 border-[#f25f4c] transition-all duration-100">
              <img
                src={game.background_image}
                alt={game.name}
                className="absolute inset-0 w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col flex-grow mt-3">
            <div className="flex justify-between pb-2">
              <span className="font-bold uppercase">{game.name}</span>
              <span className="text-white border px-1 py-[2px] rounded-lg h-7 flex items-center justify-center">
                {game.ratings_count}{" "}
                <span>
                  <ion-icon name="star-outline"></ion-icon>
                </span>
              </span>
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between">
              <span className="flex gap-1">
                <img
                  src={star}
                  alt="rating star"
                  className="flex items-center justify-center w-5 h-5"
                />
                <span className="font-bold">{game.rating}</span>
              </span>
              <span>
                Released: <span className="font-bold">{game.released}</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
