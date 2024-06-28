export const Pagination = ({ currentPage, setSearchParams, nextPage }) => {
  const clickNextPage = () => {
    setSearchParams({ page: currentPage + 1 });
  };

  const clickPreviousPage = () => {
    setSearchParams({ page: currentPage - 1 });
  };

  return (
    <section className="bg-[#0f0e17] text-[#fffffe] p-3 flex items-center justify-center max-sm:text-sm">
      <div
        disabled={currentPage <= 1}
        onClick={clickPreviousPage}
        className="hover:cursor-pointer bg-[#f25f4c] transition-all duration-300 rounded-full flex items-center justify-center p-1"
      >
        <ion-icon size="large" name="chevron-back-outline"></ion-icon>
      </div>
      <div className="mx-3 text-xl font-bold flex items-center justify-center">
        {currentPage}
      </div>
      <div
        onClick={clickNextPage}
        disabled={!nextPage}
        className="hover:cursor-pointer bg-[#f25f4c] transition-all duration-300 rounded-full flex items-center justify-center p-1"
      >
        <ion-icon size="large" name="chevron-forward-outline"></ion-icon>
      </div>
    </section>
  );
};
