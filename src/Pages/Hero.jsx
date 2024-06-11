import { Link, useNavigate } from "react-router-dom";
import { Button } from "../UI/Button";
import { data } from "../API/genreAPi";
import { useEffect, useState, useRef } from "react";

export const Hero = () => {
  const [image, setImage] = useState(data[0].image);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const animationRef = useRef();
  const startRef = useRef();

  const resetProgress = () => {
    setProgress(0);
    startRef.current = null;
  };

  const step = (timestamp) => {
    if (!startRef.current) startRef.current = timestamp;
    const elapsed = timestamp - startRef.current;

    // Calculate progress as a percentage of 5 seconds
    const newProgress = (elapsed / 5000) * 100;
    setProgress(newProgress);

    if (elapsed < 5000) {
      animationRef.current = requestAnimationFrame(step);
    } else {
      // Move to the next image
      const nextIndex = (currentIndex + 1) % data.length;
      setCurrentIndex(nextIndex);
      setImage(data[nextIndex].image);
      resetProgress();
      animationRef.current = requestAnimationFrame(step);
    }
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationRef.current);
  }, [currentIndex]);

  const handleClick = (index, image) => {
    setImage(image);
    setCurrentIndex(index);
    resetProgress();
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(step);
  };

  return (
    <section className="min-h-screen bg-[#0f0e17] text-[#fffffe] px-10 font-nunito">
      <div>
        <h1 className="text-xl font-bold pt-10 pb-5  tracking-wide text-[#fffffe] uppercase font-supreme">
          Discover New Games
        </h1>

        <p className="text-sm leading-8 lg:text-xl text-[#a7a9be] max-w-2xl mb-10">
          Welcome! Our website offers a vast collection of the latest and
          greatest games. Find your next favorite game. Enjoy!
        </p>

        <div className="flex items-center justify-center gap-2 max-md:flex-col-reverse">
          <div className="w-3/4 relative h-[600px] max-md:w-full">
            <div className="absolute inset-0 bg-black/30"></div>
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover rounded-3xl max-md:rounded-xl"
            />

            <div className="absolute bottom-8 pl-3 space-y-4">
              <div className="uppercase text-3xl max-md:text-sm">
                {data.find((game) => game.image === image).name}
              </div>

              <button
                className="bg-[#fffffe] text-[#0f0e17] py-2 px-3 max-md:flex-nowrap rounded-md font-semibol hover:bg-[#f25f4c] hover:text-white transition-all duration-300 font-semibold"
                onClick={() =>
                  navigate(
                    `/games/${data.find((game) => game.image === image).id}`
                  )
                }
              >
                View game
              </button>
            </div>
          </div>

          <div className="w-1/4 h-full max-md:w-full max-md:hidden">
            {data.map((game, index) => (
              <div
                key={game.id}
                className={`flex items-center gap-3 py-5 my-3 px-3 hover:bg-stone-600 rounded-md transition-all duration-100 cursor-pointer relative overflow-hidden  ${
                  currentIndex === index ? "bg-stone-600" : ""
                }`}
                onClick={() => handleClick(index, game.image)}
              >
                <div className="relative w-[50px] h-[50px]">
                  <img
                    src={game.image}
                    alt="genre image"
                    className="absolute inset-0 w-full h-full object-cover object-center rounded-md"
                  />
                </div>
                <div>{game.name}</div>
                {currentIndex === index && (
                  <div
                    className="absolute inset-0 bg-[rgba(255,255,255,0.1)]"
                    style={{ width: `${progress}%` }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mr-auto mt-5">
          <Link to="/games">
            <Button className="mr-auto" text="Browse all games" />
          </Link>
        </div>
      </div>
    </section>
  );
};
