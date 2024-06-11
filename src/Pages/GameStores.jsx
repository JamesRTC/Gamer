import { useProps } from "../utilities/Context";

export const GameStores = () => {
  const { gameData } = useProps();
  return (
    <div className="text-white">
      {gameData.stores.map((store) => (
        <div
          key={store.id}
          className="flex items-center justify-between max-w-[300px] py-2"
        >
          <span>{store.store.name}</span>
          <button className="border-none w-[80px] text-[#fffffe] hover:bg-[#ff8906]  bg-[#f25f4c] p-1 rounded-md transition-all duration-300 text-sm">
            <a
              href={`https://${store.store.domain}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit store
            </a>
          </button>
        </div>
      ))}
    </div>
  );
};
