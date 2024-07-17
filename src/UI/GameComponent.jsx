import { Link } from "react-router-dom";
import { star } from "../../public/assets/icons";

export const GameComponent = ({ game }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="col-span-4 md:col-span-2 lg:col-span-1 max-md:bg-stone-300 max-md:p-2 rounded-md p-2 h-full max-sm:text-sm">
      <Link
        to={`/games/${game.id}`}
        className="flex flex-col h-full"
        onClick={() => scrollToTop()}
      >
        <div className="relative flex-grow w-full h-0 pb-[56.25%] hover:border-s-4 border-[#f25f4c] transition-all duration-100">
          <img
            src={game.background_image}
            alt={game.name}
            className="absolute inset-0 w-full h-full object-cover z-0"
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
  );
};
