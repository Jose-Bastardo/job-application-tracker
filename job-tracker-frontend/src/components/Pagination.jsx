function Pagination({ numberOfPages, currentPage, onCurrentPageChange, start, end, total, clearForm }) {

    function onPageNext() {
        if (currentPage < numberOfPages) {
            onCurrentPageChange(currentPage + 1);
            clearForm();
        }
    }

    function onPagePrevious() {
        if (currentPage > 1) {
            onCurrentPageChange(currentPage - 1);
            clearForm();
        }
    }

    return (
        <div className="flex flex-row w-full mt-auto place-items-center">
            <p className="text-[#6B7280] mr-auto px-5 select-none">Showing {start} to {end} of {total} results</p>
            <div className="flex flex-row space-x-4 px-5 ml-auto h-12 [&_button]:border [&_button]:w-12 [&_button]:font-thin [&_button]:border-[#E5E7EB] [&_button]:px-4 [&_button]:py-2 [&_button]:text-center [&_button]:rounded-lg">
                <button onClick={onPagePrevious} className="text-[#6B7280] text content-center">{"<"}</button>
                <p className=" bg-[#2563EB] text-white border border-[#E5E7EB] w-12 content-center text-center rounded-lg select-none">{currentPage}</p>
                <button onClick={onPageNext} className="text-[#6B7280] content-center">{">"}</button>
            </div>
        </div>
    );
}

export default Pagination;