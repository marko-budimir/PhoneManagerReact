import Phone from './Phone';
import React from 'react';
import InputForm from '../Form/InputForm';
import axios from 'axios';

class DisplayTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPhone: null,
            mobilePhones: []
        };
    }

    async componentDidMount() {
        await this.getMobilePhones();
    }

    async getMobilePhones() {
        try {
            const response = await axios.get('https://localhost:44359/api/mobilephone?pageSize=100');
            this.setState({ mobilePhones: response.data });
        }
        catch (error) {
            console.error('Error fetching mobile phones:', error);
        }
    }

    async handleUpdate(phone) {
        this.setState({ selectedPhone: phone });
    }

    async handleDelete(id) {
        try {
            await axios.delete('https://localhost:44359/api/mobilephone/' + id);
            await this.getMobilePhones();
            this.setState({ selectedPhone: null });
        } 
        catch (error) {
            console.error('Error deleting mobile phone:', error);
        }
    }

    async handleAddOrUpdate() {
        await this.getMobilePhones();
        this.setState({ selectedPhone: null });
    }
    render() {
        const { selectedPhone, mobilePhones } = this.state;
        return (
            <div>
                <InputForm onAddOrUpdate={() => this.handleAddOrUpdate()} />
                {selectedPhone && (<InputForm selectedPhone={selectedPhone} isUpdating="true" onAddOrUpdate={() => this.handleAddOrUpdate()} />)}
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
                                    storageCapacity={phone.storageCapacityGB}
                                    ramCapacity={phone.ramGB}
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