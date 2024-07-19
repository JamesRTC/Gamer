export const Button = ({
  text,
  disabled,
  onClick,
  type,
  isActive,
  scrollToTop,
}) => {
  function handleClick() {
    onClick();
    scrollToTop();
  }
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`px-3 py-2 ${
        type === "platform"
          ? "max-sm:text-[8px] max-md:w-full max-md:mb-2 flex text-nowrap text-center"
          : ""
      }  rounded-md md:text-xs flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#ff8906] ${
        isActive ? "bg-[#ff8906]" : "bg-[#f25f4c] "
      }`}
    >
      {text}
    </button>
  );
};
