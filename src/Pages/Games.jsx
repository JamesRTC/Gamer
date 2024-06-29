import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchGames } from "../API/api";
import { Spinner } from "../UI/Spinner";
import { Pagination } from "../UI/Pagination";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { GameComponent } from "../UI/GameComponent";

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
    <section className="relative bg-[#0f0e17] text-[#fffffe] max-md:text-[#0f0e17] max-md:shadow-md min-h-screen px-10 max-sm:px-3 font-nunito">
      <h1 className="flex justify-center items-center flex-col text-2xl max-md:text-xl max-sm:text-lg font-bold uppercase tracking-wider p-5 mt-11 max-md:text-stone-300">
        <span className="font-supreme">
          All <span className="text-[#f25f4c]"> Games</span>
        </span>
        <div className="h-2 w-[100px] bg-[#f25f4c] rounded-full mt-4 max-sm:w-[80px] max-sm:mt-2 max-sm:h-1 "></div>
      </h1>
      <div className="grid grid-cols-4 gap-5 lg:grid-cols-3">
        {allGames.results.map((game) => (
          <>
            <GameComponent key={game.id} game={game} />
          </>
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
