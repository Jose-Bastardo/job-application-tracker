function Pagination({ numberOfPages, currentPage, onCurrentPageChange }) {

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
        <div className="Pagination">
            <button onClick={onPagePrevious}>back</button>
            <p>{currentPage}/{numberOfPages}</p>
            <button onClick={onPageNext}>next</button>
        </div>
    );
}

export default Pagination;