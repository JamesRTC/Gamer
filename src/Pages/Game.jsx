import { useQuery } from "@tanstack/react-query";
import { fetchGame } from "../API/api";
import { Spinner } from "../UI/Spinner";
import { Link, Outlet, useParams } from "react-router-dom";
import { PropsContext } from "../utilities/Context";

export const Game = () => {
  const { gameId } = useParams();

  // this function strips html tags from a block of text
  // function stripHtmlTags(html) {
  //   return html.replace(/<\/?[^>]+(>|$)/g, "");
  // }

  const getFirstParagraph = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const firstParagraph = div.querySelector("p");
    return firstParagraph ? firstParagraph.textContent : "";
  };

  const { isLoading, data: gameData } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => fetchGame(gameId),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (isLoading) return <Spinner />;

  const cleanDescription = getFirstParagraph(gameData.description);

  // Store scroll position before navigating away
  window.addEventListener("beforeunload", function () {
    sessionStorage.setItem("scrollPosition", window.scrollY);
  });

  // Restore scroll position when page is loaded
  window.addEventListener("load", function () {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition !== null) {
      window.scrollTo(0, parseInt(scrollPosition));
    }
  });

  // Custom back button function
  function goBack() {
    window.history.back();
  }
  return (
    <PropsContext.Provider value={{ gameData }}>
      <section className="mt-[55px] min-h-screen max-sm:text-sm max-sm:leading-7 leading-[28px] bg-[#0f0e17] text-[#fffffe]  max-md:shadow-md px-10 font-supreme pb-10 max-sm:px-3">
        <div className="mt-2">
          <Link to="/games" onClick={goBack}>
            <span className="flex gap-1 pt-2">
              <span className="flex items-center justify-center">
                <ion-icon
                  className="stroke-red"
                  name="arrow-back-outline"
                ></ion-icon>
              </span>
              <span className="text-[#f25f4c]">back </span>
            </span>
          </Link>
        </div>
        <h1 className="uppercase font-bold text-3xl py-3 max-sm:text-xl font-nunito">
          {gameData.name}
        </h1>
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <div className="relative aspect-video">
            <img
              src={gameData.background_image}
              alt="game background image"
              className="absolute inset-0 h-full w-full object-cover rounded-md"
            />
          </div>
          <div>
            <h1 className="text-2xl pb-2 font-nunito max-sm:text-lg">
              {" "}
              <span className="text-[#f25f4c] "> Game </span> Details
            </h1>
            {cleanDescription && <div>{cleanDescription}</div>}

            <div className="pt-5">
              <div className="py-2 grid grid-cols-[auto_1fr] items-start gap-2">
                <span className="flex items-center gap-1">
                  <span className="flex items-center justify-center">
                    <ion-icon name="time-outline"></ion-icon>{" "}
                  </span>{" "}
                  <span className="uppercase font-semibold"> Released: </span>
                </span>
                <span>{gameData.released}</span>{" "}
              </div>

              <div className="pb-2 grid grid-cols-[auto_1fr] items-start gap-2">
                <span className="flex items-center gap-1">
                  <span className="flex items-center justify-center">
                    <ion-icon name="pricetags-outline"></ion-icon>
                  </span>
                  <span className="uppercase font-semibold"> Genre: </span>
                </span>
                <span>
                  {gameData.genres.map((genre, index) => (
                    <>
                      <span> {genre.name} </span>
                      <span>
                        {index < gameData.genres.length - 1 ? "," : ""}
                      </span>
                    </>
                  ))}
                </span>
              </div>

              <div className="pb-2 grid grid-cols-[auto_1fr] items-start gap-2">
                <span className="flex items-center gap-1">
                  <span className="flex items-center justify-center">
                    <ion-icon name="desktop-outline"></ion-icon>
                  </span>
                  <span className="uppercase font-semibold">Platforms: </span>
                </span>
                <span>
                  {gameData.platforms.map((platform, index) => (
                    <>
                      <span> {platform.platform.name} </span>
                      <span>
                        {index < gameData.platforms.length - 1 ? "," : ""}
                      </span>
                    </>
                  ))}
                </span>
              </div>

              <div className="pb-2 grid grid-cols-[auto_1fr] items-start gap-2">
                <span className="flex items-center gap-1">
                  <span className="flex items-center justify-center">
                    <ion-icon name="code-working-outline"></ion-icon>
                  </span>
                  <span className="uppercase font-semibold">Developers: </span>
                </span>
                <span>
                  {gameData.developers.map((developer, index) => (
                    <>
                      <span> {developer.name} </span>
                      <span>
                        {index < gameData.developers.length - 1 ? "," : ""}
                      </span>
                    </>
                  ))}
                </span>
              </div>

              <div className="pb-2 grid grid-cols-[auto_1fr] items-start gap-2">
                <span className="flex items-center gap-1">
                  <span className="flex items-center justify-center">
                    <ion-icon name="globe-outline"></ion-icon>
                  </span>
                  <span className="uppercase font-semibold">Publishers: </span>
                </span>
                <span>
                  {gameData.publishers.map((publisher, index) => (
                    <>
                      <span> {publisher.name} </span>
                      <span>
                        {" "}
                        {index < gameData.publishers.length - 1 ? "," : ""}
                      </span>
                    </>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Outlet />
        </div>
      </section>
    </PropsContext.Provider>
  );
};
