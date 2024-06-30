import { fetchStores } from "../API/api";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../UI/Spinner";

export const Stores = () => {
  const { isLoading, data: stores } = useQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (isLoading) return <Spinner />;

  return (
    <section className="min-h-screen max-sm:pt-5 px-10 max-sm:px-3 text-[#fffffe] bg-[#0f0e17] items-center font-supreme">
      <h1 className="mt-[65px] flex justify-center items-center flex-col text-2xl max-sm:text-lg font-bold uppercase tracking-wider pb-5 max-md:text-stone-300">
        <span className="text-[#fffffe] font-nunito">
          All <span className="text-[#f25f4c]"> stores</span>
        </span>
        <div className="h-2 w-[100px] bg-[#f25f4c] rounded-full mt-4 max-sm:w-[80px] max-sm:mt-2 max-sm:h-1  "></div>
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-sm:text-sm ">
        {stores.results.map((store) => (
          <>
            <a
              href={`https://${store.domain}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                key={store.id}
                className="flex gap-3 hover:border-s-4 border-[#f25f4c] transition-all duration-100"
              >
                <div className="relative flex-grow w-2/5 h-0 pb-[56.25%]">
                  <img
                    src={store.image_background}
                    alt="store image"
                    className=" absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center w-3/5 gap-1">
                  <div className="uppercase font-bold">{store.name}</div>
                  <div>
                    {" "}
                    <span className="font-semibold">Domain: </span>
                    {store.domain}
                  </div>
                  <div>
                    {" "}
                    <span className="font-semibold">Game count: </span>
                    {store.games_count}
                  </div>
                  <div>
                    <span className="font-semibold">Games:</span>
                    {store.games.map((game) => (
                      <>
                        <span
                          key={game.id}
                          className="md:bg-stone-300 md:rounded-full md:px-2 md:py-1 md:m-1 text-xs inline-block md:text-black"
                        >
                          {" "}
                          {game.name}
                        </span>
                        {/* <span> {index < store.games.length - 1 ? "," : ""}</span> */}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          </>
        ))}
      </div>
    </section>
  );
};
