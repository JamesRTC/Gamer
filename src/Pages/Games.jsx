import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchGames } from "../API/api";
import { star } from "../../public/assets/icons";
import { Spinner } from "../UI/Spinner";
import { Pagination } from "../UI/Pagination";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export const Games = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const queryClient = useQueryClient();

  useEffect(() => {
    const nextPage = currentPage + 1;
    queryClient.prefetchQuery(["games", nextPage], () => fetchGames(nextPage));
  }, [queryClient, currentPage]);

  const { isLoading, data: allGames } = useQuery({
    queryKey: ["games", currentPage],
    queryFn: () => fetchGames(currentPage),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (isLoading) return <Spinner />;

  const APINextPage = allGames.next;

  return (
    <section className="bg-[#0f0e17] text-[#fffffe] max-md:text-[#0f0e17] max-md:shadow-md min-h-screen px-10 max-sm:px-3 font-nunito">
      <h1 className="flex justify-center items-center flex-col text-2xl max-md:text-xl max-sm:text-lg font-bold uppercase tracking-wider p-5 max-md:text-stone-300">
        <span className="font-supreme">
          All <span className="text-[#f25f4c]"> Games</span>
        </span>
        <div className="h-2 w-[100px] bg-[#f25f4c] rounded-full mt-4 max-sm:w-[80px] max-sm:mt-2 max-sm:h-1 "></div>
      </h1>
      <div className="grid grid-cols-4 gap-5 lg:grid-cols-3">
        {allGames.results.map((game) => (
          <div
            key={game.id}
            className="col-span-4 md:col-span-2 lg:col-span-1 max-md:bg-stone-300 max-md:p-2 rounded-md p-2 h-full max-sm:text-sm"
          >
            <Link to={`/games/${game.id}`} className="flex flex-col h-full">
              <div className="relative flex-grow w-full h-0 pb-[56.25%] hover:border-s-4 border-[#f25f4c] transition-all duration-100">
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="pt-3 flex flex-col flex-grow">
                <div className="flex justify-between pb-2">
                  <span className="font-bold uppercase">{game.name}</span>
                  <span className="text-white border bg-[#0f0e17] px-1 py-[2px] rounded-lg text-nowrap h-7 flex items-center gap-1 justify-center">
                    {game.ratings_count}{" "}
                    <span>
                      <ion-icon name="star-outline"></ion-icon>
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex flex-grow justify-between">
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
            </Link>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-2 max-md:rounded-xl">
        <Pagination
          currentPage={currentPage}
          setSearchParams={setSearchParams}
          nextPage={APINextPage}
        />
      </div>
    </section>
  );
};
