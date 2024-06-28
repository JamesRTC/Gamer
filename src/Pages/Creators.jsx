import { useQuery } from "@tanstack/react-query";
import { fetchCreators } from "../API/api";
import { Spinner } from "../UI/Spinner";

export const Creators = () => {
  const { isLoading, data: creators } = useQuery({
    queryKey: ["creators"],
    queryFn: () => fetchCreators(),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (isLoading) return <Spinner />;

  if (!creators) return null;

  return (
    <section className="min-h-screen pt-5 max-sm:pb-5 px-10 text-[#fffffe] bg-[#0f0e17] max-sm:px-3 font-supreme">
      <h1 className="flex justify-center items-center flex-col text-2xl max-md:text-xl max-sm:text-lg font-bold uppercase tracking-wider pb-5 max-md:text-stone-300">
        <span className="font-nunito">
          Game <span className="text-[#f25f4c]"> creators</span>
        </span>
        <div className="h-2 w-[100px] bg-[#f25f4c] rounded-full mt-4 max-sm:w-[80px] max-sm:mt-2 max-sm:h-1"></div>
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-sm:gap-5 max-sm:text-sm">
        {creators.results.map((creator) => (
          <div
            key={creator.id}
            className="relative flex flex-col items-center justify-between p-5 rounded-lg overflow-hidden"
            style={{
              height: "100%", // or set a specific min-height if needed
              backgroundImage: `url(${creator.image_background})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-90"></div>

            <div className="z-10 mb-4">
              <img
                src={creator.image}
                alt="creator image"
                className="rounded-full h-[100px] w-[100px] border-2 border-[#f25f4c]"
              />
            </div>

            <div className="z-10 text-center mb-2">
              <div className="font-bold text-xl">{creator.name}</div>
              <div>
                <span className="font-bold">Game count: </span>
                {creator.games_count}
              </div>
              <div>
                <span className="font-bold">Positions: </span>
                {creator.positions.map((position, index) => (
                  <>
                    <span key={position.id}> {position.name} </span>
                    <span>
                      {" "}
                      {index < creator.positions.length - 1 ? "," : ""}
                    </span>
                  </>
                ))}
              </div>
            </div>

            <div className="z-10 flex gap-2">
              <div className="font-bold">Games:</div>
              <div>
                {creator.games.map((game, index) => (
                  <>
                    <span key={game.id}> {game.name} </span>
                    <span> {index < creator.games.length - 1 ? "," : ""}</span>
                  </>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
