function Pagination({ numberOfPages, currentPage, onCurrentPageChange, start, end, total }) {

    function onPageNext() {
        if (currentPage < numberOfPages) {
            onCurrentPageChange(currentPage + 1);
        }
    }

    function onPagePrevious() {
        if (currentPage > 1) {
            onCurrentPageChange(currentPage - 1);
        }
    }

    return (
        <div className="flex flex-row w-full mt-auto">
            <p className="text-[#6B7280] mr-auto px-5 select-none">Showing {start} to {end} of {total} results</p>
            <div className="flex flex-row space-x-2 px-5 ml-auto [&_button]:border [&_button]:border-[#E5E7EB] [&_button]:px-4 [&_button]:py-2 [&_button]:text-center [&_button]:rounded-lg">
                <button onClick={onPagePrevious}>{"<"}</button>
                <p className=" bg-[#2563EB] text-white border border-[#E5E7EB] px-4 py-2 text-center rounded-lg select-none">{currentPage}</p>
                <button onClick={onPageNext}>{">"}</button>
            </div>
        </div>
    );
}

export default Pagination;