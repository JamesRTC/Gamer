export const Button = ({ text, disabled, onClick }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="px-3 py-2 max-sm:text-sm hover:bg-[#ff8906] rounded-md cursor-pointer bg-[#f25f4c] transition-all duration-300"
    >
      {text}
    </button>
  );
};
