import Phone from './Phone';

function DisplayTable() {
    let mobilePhones = localStorage.getItem('mobilePhones');
    mobilePhones = mobilePhones ? JSON.parse(mobilePhones) : [];
    if (mobilePhones.length === 0) {
        mobilePhones = [
            { id: 0, brand: "Apple", model: "iPhone 12", operatingSystem: "iOS", storageCapacity: 64, ramCapacity: 4, color: "Black" },
            { id: 1, brand: "Samsung", model: "Galaxy S21", operatingSystem: "Android", storageCapacity: 128, ramCapacity: 8, color: "White" },
            { id: 2, brand: "Google", model: "Pixel 5", operatingSystem: "Android", storageCapacity: 128, ramCapacity: 8, color: "Black" }
        ];
    }
    return (
        <div>
            <h2 className="phoneTableTitle">Phones</h2>
            <table id="mobilePhoneTable">
                <tbody>
                    <tr>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Operating System</th>
                        <th>Storage Capacity (GB)</th>
                        <th>RAM (GB)</th>
                        <th>Color</th>
                    </tr>
                    {mobilePhones
                        .sort((a, b) => {
                            if (a.brand === b.brand) {
                                return a.model.localeCompare(b.model);
                            }
                            return a.brand.localeCompare(b.brand);
                        })
                        .map((phone) => (
                            <Phone
                                key={phone.id}
                                brand={phone.brand}
                                model={phone.model}
                                operatingSystem={phone.operatingSystem}
                                storageCapacity={phone.storageCapacity}
                                ramCapacity={phone.ramCapacity}
                                color={phone.color}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default DisplayTable;