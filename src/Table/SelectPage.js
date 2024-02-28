function SelectPage({ currentPage, handleNext, handlePrev}) {
    return (
        <div className="pagination">
            <button onClick={handlePrev}>Previous</button>
            <span>Page {currentPage}</span>
            <button onClick={handleNext}>Next</button>
        </div>
    )
}

export default SelectPage;