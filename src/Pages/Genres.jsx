import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGameGenres } from "../API/api";
import { Spinner } from "../UI/Spinner";
import { useSearchParams } from "react-router-dom";
import { GameItem } from "../UI/GameItem";

export const Genres = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading: loadingGenres, data: genres } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGameGenres,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (genres && genres.results.length > 0) {
      const genreFromParams = searchParams.get("genre");
      const initialGenre = genreFromParams
        ? genres.results.find((genre) => genre.name === genreFromParams)
        : genres.results[0];
      setSelectedGenre(initialGenre);
    }
  }, [genres, searchParams]);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setSearchParams({ genre: genre.name });
  };

  if (loadingGenres) return <Spinner />;

  if (!genres) return null;

  return (
    <section className="bg-[#0f0e17] font-nunito pb-10">
      <h1 className="flex justify-center items-center flex-col text-2xl max-md:text-xl font-bold uppercase tracking-wider p-5 max-md:text-stone-300">
        <span className="text-[#fffffe] font-supreme">
          All <span className="text-[#f25f4c]"> Genres</span>
        </span>
        <div className="h-2 w-[100px] bg-[#f25f4c] rounded-full mt-4 "></div>
      </h1>
      <div className="grid grid-cols-[80px_1fr] md:grid-cols-[auto_1fr] bg-slate-300 min-h-screen">
        <aside className=" bg-[#0f0e17] text-white p-4 h-full overflow-scroll min-h-screen">
          {genres.results.map((genre) => (
            <div
              key={genre.id}
              onClick={() => handleGenreClick(genre)}
              className={`cursor-pointer p-2 hover:bg-gray-500 ${
                selectedGenre?.id === genre.id ? "bg-[#f25f4c]" : ""
              }`}
            >
              {genre.name}
            </div>
          ))}
        </aside>
        <main className="p-4 min-h-screen">
          {selectedGenre && (
            <div className="">
              <h2 className="text-2xl font-bold mb-4 uppercase">
                {selectedGenre.name}
              </h2>
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {selectedGenre.games.map((game) => (
                  <GameItem key={game.id} gameId={game.id} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};
