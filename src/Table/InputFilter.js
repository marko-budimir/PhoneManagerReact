function InputFilter({ filter, handleFilterChange }) {
    return (
        <table id="filterTable">
            <tbody>
                <tr>
                    <th>Search</th>
                    <th>Min storage (GB)</th>
                    <th>Max storage (GB)</th>
                    <th>Min ram (GB)</th>
                    <th>Max ram (GB)</th>
                </tr>
                <tr>
                    <td><input type="text" id="search" name="searchQuery" onChange={handleFilterChange} value={filter.searchQuery} /></td>
                    <td><input type="number" id="minStorage" name="minStorageCapacityGB" onChange={handleFilterChange} value={filter.minStorageCapacityGB} /></td>
                    <td><input type="number" id="maxStorage" name="maxStorageCapacityGB" onChange={handleFilterChange} value={filter.maxStorageCapacityGB} /></td>
                    <td><input type="number" id="minRam" name="minRamGB" onChange={handleFilterChange} value={filter.minRamGB} /></td>
                    <td><input type="number" id="maxRam" name="maxRamGB" onChange={handleFilterChange} value={filter.maxRamGB} /></td>
                </tr>
            </tbody>
        </table>
    );
}

export default InputFilter;