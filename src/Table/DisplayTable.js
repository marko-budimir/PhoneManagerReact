import Phone from './Phone';
import { useState, useEffect } from 'react';
import InputForm from '../Form/InputForm';

function DisplayTable() {
    const [selectedPhone, setSelectedPhone] = useState(null);
    const [mobilePhones, setMobilePhones] = useState([]);

    useEffect(() => {
        const storedPhones = localStorage.getItem('mobilePhones');
        setMobilePhones(storedPhones ? JSON.parse(storedPhones) : []);
    }, [selectedPhone]);


    function handleUpdate(phone) {
        setSelectedPhone(phone);
    }
    function handleDelete(id) {
        deletePhone(id);
        setSelectedPhone(null);
    }

    function deletePhone(id) {
        const updatedMobilePhones = mobilePhones.filter(phone => phone.id !== id);
        localStorage.setItem('mobilePhones', JSON.stringify(updatedMobilePhones));
        setMobilePhones(updatedMobilePhones);
    }

    function handleAddOrUpdate(updatedMobilePhones) {
        setMobilePhones(updatedMobilePhones);
        setSelectedPhone(null);
    }

    return (
        <div>
            <InputForm onAddOrUpdate={handleAddOrUpdate} />
            {selectedPhone && (<InputForm selectedPhone={selectedPhone} isUpdating="true" onAddOrUpdate={handleAddOrUpdate} />)}
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
                                handleUpdate={() => handleUpdate(phone)}
                                handleDelete={() => handleDelete(phone.id)}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default DisplayTable;