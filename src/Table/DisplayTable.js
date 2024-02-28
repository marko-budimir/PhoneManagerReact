import Phone from './Phone';
import React from 'react';
import InputForm from '../Form/InputForm';
import axios from 'axios';
import SelectPageSize from './SelectPageSize';
import SelectPage from './SelectPage';
import InputFilter from './InputFilter';

class DisplayTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPhone: null,
            mobilePhones: [],
            currentPage: 1,
            pageSizeOptions: [2, 10, 20, 50],
            selectedPageSize: 10,
            totalPages: 1,
            filter: {
                searchQuery: '',
                minStorageCapacityGB: '',
                maxStorageCapacityGB: '',
                minRamGB: '',
                maxRamGB: ''
            },
            sortBy:'Brand',
            isAscending: true
        };
    }

    async componentDidMount() {
        await this.getMobilePhones(this.state.currentPage, this.state.selectedPageSize);
    }

    async getMobilePhones(page = 1, pageSize = 10) {
        const filterQueryString = this.buildFilterQueryString();
        let sortQueryString = '';
        if(this.state.sortBy) {
            sortQueryString = `&sortBy=${this.state.sortBy}&isAscending=${this.state.isAscending}`;
        }
        try {
            const response = await axios.get(`https://localhost:44359/api/mobilephone?pageNumber=${page}&pageSize=${pageSize}${filterQueryString}${sortQueryString}`);
            this.setState({ mobilePhones: response.data.items, totalPages: response.data.totalPages});
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
            await this.getMobilePhones(this.state.currentPage, this.state.pageSize);
            this.setState({ selectedPhone: null });
        }
        catch (error) {
            console.error('Error deleting mobile phone:', error);
        }
    }

    async handleAddOrUpdate() {
        await this.getMobilePhones(this.state.currentPage, this.state.pageSize);
        this.setState({ selectedPhone: null });
    }

    async handlePageChange(direction) {
        const { currentPage, selectedPageSize } = this.state;
        let newPage;
        if (Number.isInteger(direction)) {
            newPage = direction;
        }
        else {
            newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
        }

        if (newPage >= 1) {
            await this.getMobilePhones(newPage, selectedPageSize);
            this.setState({ currentPage: newPage });
        }
    }

    handlePageSizeChange(event) {
        const newPageSize = parseInt(event.target.value, 10);
        this.setState({ selectedPageSize: newPageSize, currentPage: 1 }, () => {
            this.getMobilePhones(this.state.currentPage, this.state.selectedPageSize);
        });
    }

    handleFilterChange(event) {
        const { filter } = this.state;
        const newFilter = { ...filter, [event.target.name]: event.target.value };
        this.setState({ filter: newFilter }, () => {
            this.getMobilePhones(this.state.currentPage, this.state.selectedPageSize);
        });
    }

    buildFilterQueryString() {
        const { filter } = this.state;
        let queryString = '';
        for (const key in filter) {
            if (filter[key]) {
                queryString += `&${key}=${filter[key]}`;
            }
        }
        return queryString;
    }

    handleSort(sortColumn) {
        const { sortBy, isAscending } = this.state;
        if(sortColumn === sortBy) {
            this.setState({ isAscending: !isAscending }, () => {
                this.getMobilePhones(this.state.currentPage, this.state.selectedPageSize);
            });
        } else {
            this.setState({ sortBy: sortColumn, isAscending: true }, () => {
                this.getMobilePhones(this.state.currentPage, this.state.selectedPageSize);
            });
        }
    }

    render() {
        const { selectedPhone, mobilePhones, currentPage, pageSizeOptions, selectedPageSize, filter, sortBy, isAscending, totalPages } = this.state;
        return (
            <div>
                <InputForm onAddOrUpdate={() => this.handleAddOrUpdate()} />
                {selectedPhone && (<InputForm selectedPhone={selectedPhone} isUpdating="true" onAddOrUpdate={() => this.handleAddOrUpdate()} />)}
                <h2 className="phoneTableTitle">Phones</h2>
                <InputFilter filter={filter} handleFilterChange={(event) => this.handleFilterChange(event)} />
                <table id="mobilePhoneTable">
                    <tbody>
                        <tr>
                            <th className={sortBy === 'Brand' ? isAscending.toString() : ''} onClick={() => this.handleSort('Brand')}>Brand</th>
                            <th className={sortBy === 'Model' ? isAscending.toString() : ''} onClick={() => this.handleSort('Model')}>Model</th>
                            <th className={sortBy === 'OperatingSystem' ? isAscending.toString() : ''} onClick={() => this.handleSort('OperatingSystem')}>Operating System</th>
                            <th className={sortBy === 'StorageCapacityGB' ? isAscending.toString() : ''} onClick={() => this.handleSort('StorageCapacityGB')}>Storage Capacity (GB)</th>
                            <th className={sortBy === 'RamGB' ? isAscending.toString() : ''} onClick={() => this.handleSort('RamGB')}>RAM (GB)</th>
                            <th className={sortBy === 'Color' ? isAscending.toString() : ''} onClick={() => this.handleSort('Color')}>Color</th>
                        </tr>
                        {mobilePhones
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
                <SelectPageSize
                    handleChange={(event) => this.handlePageSizeChange(event)}
                    selectedPageSize={selectedPageSize}
                    pageSizeOptions={pageSizeOptions}
                />
                <SelectPage
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handleNext={() => this.handlePageChange('next')}
                    handlePrev={() => this.handlePageChange('prev')}
                    handlePageClick={(page) => this.handlePageChange(page)}
                />
            </div>
        )
    }
}

export default DisplayTable;