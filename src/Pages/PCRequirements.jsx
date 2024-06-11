import { useProps } from "../utilities/Context";

export const PCRequirements = () => {
  const { gameData } = useProps();
  let pcObj = gameData.platforms.find(
    (platform) => platform.platform.name === "PC"
  );

  return (
    <div className="text-white space-y-3 pt-3 max-w-3xl">
      <div>
        {pcObj?.requirements.minimum
          ? pcObj.requirements.minimum
          : "No minimum PC requirements available. Search the internet for this infomation if interested"}
      </div>
      <div>
        {pcObj?.requirements.recommended
          ? pcObj.requirements.recommended
          : "No recommended PC requirements available. Search the internet for this infomation if interested"}
      </div>
    </div>
  );
};
