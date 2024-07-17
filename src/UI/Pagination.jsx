export const Pagination = ({ currentPage, setSearchParams, nextPage }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clickNextPage = () => {
    setSearchParams({ page: currentPage + 1 });
    scrollToTop();
  };

  const clickPreviousPage = () => {
    setSearchParams({ page: currentPage - 1 });
    scrollToTop();
  };

  return (
    <section className="bg-[#0f0e17] text-[#fffffe] p-3 flex items-center justify-center max-sm:text-sm">
      <button
        disabled={currentPage <= 1}
        onClick={clickPreviousPage}
        className="hover:cursor-pointer bg-[#f25f4c] transition-all duration-300 rounded-full flex items-center justify-center p-1"
      >
        <ion-icon size="large" name="chevron-back-outline"></ion-icon>
      </button>

      <div className="mx-3 text-xl font-bold flex items-center justify-center">
        {currentPage}
      </div>
      <button
        onClick={clickNextPage}
        disabled={!nextPage}
        className="hover:cursor-pointer bg-[#f25f4c] transition-all duration-300 rounded-full flex items-center justify-center p-1"
      >
        <ion-icon size="large" name="chevron-forward-outline"></ion-icon>
      </button>
    </section>
  );
};
