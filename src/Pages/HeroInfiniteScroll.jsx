import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchHeroData } from "../API/api";
import { GameComponent } from "../UI/GameComponent";
import { Spinner } from "../UI/Spinner";
import { InfiniteLoadSpinner } from "../UI/InfiniteLoadSpinner";
import React from "react";

export const HeroInfiniteScroll = () => {
  const initialPage =
    "https://rawg.io/api/games?page_size=200&key=d0454d87313942169b3b1153701996d9";

  const {
    data: heroGames,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["top-games"],
    queryFn: ({ pageParam = initialPage }) => fetchHeroData(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  });

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}. Try reloading the page</div>;

  // Calculate the total number of items loaded so far
  const totalItems =
    heroGames?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  return (
    <>
      {isFetching && <InfiniteLoadSpinner />}
      <InfiniteScroll
        dataLength={totalItems} // Pass the total number of items loaded so far
        next={fetchNextPage}
        hasMore={hasNextPage}
        // loader={<InfiniteLoadSpinner />}
        endMessage={<p className="text-center font-bold">All games loaded</p>}
      >
        <div className="grid grid-cols-4 gap-5 lg:grid-cols-3 max-md:text-[#0f0e17] max-md:shadow-md max-sm:px-3 font-nunito">
          {heroGames?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.results
                .filter((item) => item.rating * 1 >= 4)
                .map((game) => (
                  <GameComponent key={game.id} game={game} />
                ))}
            </React.Fragment>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};
