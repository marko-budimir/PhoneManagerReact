import { getShops } from "../services/ShopService";
import { useEffect, useState } from "react";

function InputFilter({ searchQuery, minStorageCapacityGB, maxStorageCapacityGB, minRamGB, maxRamGB, shopId, handleFilterChange }) {
    const [shops, setShops] = useState([]);

    useEffect(() => {
        const fetchShops = async () => {
            const response = await getShops();
            setShops(response);
        };

        fetchShops();
    }, []);
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
                    <td><input type="text" id="search" name="searchQuery" onChange={handleFilterChange} value={searchQuery} /></td>
                    <td><input type="number" id="minStorage" name="minStorageCapacityGB" onChange={handleFilterChange} value={minStorageCapacityGB} /></td>
                    <td><input type="number" id="maxStorage" name="maxStorageCapacityGB" onChange={handleFilterChange} value={maxStorageCapacityGB} /></td>
                    <td><input type="number" id="minRam" name="minRamGB" onChange={handleFilterChange} value={minRamGB} /></td>
                    <td><input type="number" id="maxRam" name="maxRamGB" onChange={handleFilterChange} value={maxRamGB} /></td>
                    <td>
                        <select id="shopId" name="shopId" onChange={handleFilterChange} value={shopId}>
                            <option value="">All Shops</option>
                            {shops.map((shop) => (
                                <option key={shop.id} value={shop.id}>{shop.name}</option>
                            ))}
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default InputFilter;