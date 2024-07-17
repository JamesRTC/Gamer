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
        type === "platform" ? "text-xs max-sm:text-[12px]" : ""
      } max-sm:text-sm rounded-md cursor-pointer transition-all duration-300 hover:bg-[#ff8906] ${
        isActive ? "bg-[#ff8906]" : "bg-[#f25f4c] "
      }`}
    >
      {text}
    </button>
  );
};
