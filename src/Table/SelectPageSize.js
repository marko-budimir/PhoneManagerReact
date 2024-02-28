function SelectPageSize({ handleChange, selectedPageSize, pageSizeOptions }) {
    return (
        <div>
            <label htmlFor="pageSize">Page Size:</label>
            <select id="pageSize" onChange={handleChange} value={selectedPageSize}>
                {pageSizeOptions.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectPageSize;