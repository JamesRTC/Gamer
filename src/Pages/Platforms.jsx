import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchHeroData } from "../API/api";
import { GameComponent } from "../UI/GameComponent";
import { Spinner } from "../UI/Spinner";
import { InfiniteLoadSpinner } from "../UI/InfiniteLoadSpinner";
import React, { useState } from "react";
import { Button } from "../UI/Button";

export const Platforms = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("playstation 5");
  const platforms = [
    "PlayStation 5",
    "PlayStation 4",
    "PlayStation 3",
    "PlayStation 2",
    "Xbox series s/x",
    "Xbox one",
    "Nintendo switch",
    "PC",
    "Linux",
    "mac",
    "iOS",
    "Android",
  ];

  const handleSelectPlatform = (platform) => {
    setSelectedPlatform(platform.toLowerCase());
  };

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
  } = useInfiniteQuery(
    ["top-games"],
    ({ pageParam = initialPage }) => fetchHeroData(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.next || undefined;
      },
    }
  );

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}. Try reloading the page</div>;

  // Calculate the total number of items loaded so far
  const totalItems =
    heroGames?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative bg-[#0f0e17] text-[#fffffe] max-md:text-[#0f0e17] max-md:shadow-md min-h-screen px-10 max-sm:px-3 font-nunito">
      <h1 className="flex justify-center items-center flex-col text-2xl max-md:text-xl max-sm:text-lg font-bold uppercase tracking-wider p-5 mt-11 max-md:text-stone-300">
        <span id="all-games" className="font-supreme">
          Filter games by <span className="text-[#f25f4c]"> platform</span>
        </span>
        <div className="h-2 w-[100px] bg-[#f25f4c] rounded-full mt-4 max-sm:w-[80px] max-sm:mt-2 max-sm:h-1 "></div>
      </h1>

      <div className="flex gap-2 items-center justify-center my-2 flex-wrap sticky top-[65px] z-10 bg-[#0f0e17] shadow-md pb-2">
        {platforms.map((platform, index) => (
          <Button
            key={index}
            text={platform.toUpperCase()}
            onClick={() => handleSelectPlatform(platform)}
            type="platform"
            isActive={selectedPlatform === platform.toLowerCase()}
            scrollToTop={scrollToTop}
          />
        ))}
      </div>

      {isFetching && <InfiniteLoadSpinner />}
      <InfiniteScroll
        dataLength={totalItems} // Pass the total number of items loaded so far
        next={fetchNextPage}
        hasMore={hasNextPage}
        endMessage={<p className="text-center font-bold">All games loaded</p>}
      >
        <div className="grid grid-cols-4 gap-5 lg:grid-cols-3 max-md:text-[#0f0e17] max-md:shadow-md max-sm:px-3 font-nunito">
          {heroGames?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.results
                .filter((item) =>
                  item.platforms.some((platform) =>
                    platform.platform.name
                      .toLowerCase()
                      .includes(selectedPlatform)
                  )
                )
                .map((game) => (
                  <GameComponent key={game.id} game={game} />
                ))}
            </React.Fragment>
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
};
