function SelectPage({ currentPage, totalPages, handleNext, handlePrev, handlePageClick}) {
    const renderPageButtons = () => {
        const pageButtons = [];
        for (let page = 1; page <= totalPages; page++) {
            pageButtons.push(
                <button key={page} onClick={() => handlePageClick(page)} className={currentPage === page ? 'active' : ''}>
                    {page}
                </button>
            );
        }
        return pageButtons;
    };

    return (
        <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
            {renderPageButtons()}
            <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
}

export default SelectPage;