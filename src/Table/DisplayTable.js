import Phone from './Phone';
import React from 'react';
import InputForm from '../Form/InputForm';

class DisplayTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPhone: null,
            mobilePhones: []
        };
    }

    componentDidMount() {
        const storedPhones = localStorage.getItem('mobilePhones');
        this.setState({ mobilePhones: storedPhones ? JSON.parse(storedPhones) : [] });
    }


    handleUpdate(phone) {
        this.setState({ selectedPhone: phone });
    }

    handleDelete(id) {
        this.deletePhone(id);
        this.setState({ mobilePhones: null });
    }

    deletePhone(id) {
        const { mobilePhones } = this.state;
        const updatedMobilePhones = mobilePhones.filter(phone => phone.id !== id);
        localStorage.setItem('mobilePhones', JSON.stringify(updatedMobilePhones));
        this.setState({ mobilePhones: updatedMobilePhones });
    }

    handleAddOrUpdate(updatedMobilePhones) {
        this.setState({ mobilePhones: updatedMobilePhones, selectedPhone: null });
    }
    render() {
        const { selectedPhone, mobilePhones } = this.state;
        return (
            <div>
                <InputForm onAddOrUpdate={this.handleAddOrUpdate} />
                {selectedPhone && (<InputForm selectedPhone={selectedPhone} isUpdating="true" onAddOrUpdate={this.handleAddOrUpdate} />)}
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
                                    handleUpdate={() => this.handleUpdate(phone)}
                                    handleDelete={() => this.handleDelete(phone.id)}
                                />
                            ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DisplayTable;