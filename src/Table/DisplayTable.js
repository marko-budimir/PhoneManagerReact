import Phone from './Phone';
import React from 'react';
import InputForm from '../Form/InputForm';
import SelectPageSize from './SelectPageSize';
import SelectPage from './SelectPage';
import InputFilter from './InputFilter';
import {getMobilePhones, deleteMobilePhone} from '../services/PhoneService.js';

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

    componentDidMount() {
        this.getMobilePhones();
    }

    componentDidUpdate() {
        this.getMobilePhones();
    }

    getMobilePhones() {
        const queryString = this.buildQueryString();
        
        try {
            getMobilePhones(queryString).then((response) => {
                if(response) {
                    this.handleGetMobilePhones(response[0], response[1]);
                }
            });
        }
        catch (error) {
            console.error('Error fetching mobile phones:', error);
        }
    }

    handleGetMobilePhones(mobilePhones, totalPages) {
        this.setState({ mobilePhones, totalPages });
    }

    handleUpdate(phone) {
        this.setState({ selectedPhone: phone });
    }

    handleDelete(id) {
        try {
            deleteMobilePhone(id).then((response) => {
            this.setState({ selectedPhone: null });
            if(response === 504) {
                console.error('Error deleting mobile phone:', response.data);
            }
            if(response === 404) {
                console.error('Error deleting mobile phone:', response.data);
            }
            });
        }
        catch (error) {
            console.error('Error deleting mobile phone:', error);
        }
    }

    handleAddOrUpdate() {
        this.setState({ selectedPhone: null });
    }

    handlePageChange(direction) {
        const { currentPage } = this.state;
        let newPage;
        if (Number.isInteger(direction)) {
            newPage = direction;
        }
        else {
            newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
        }

        if (newPage >= 1) {
            this.setState({ currentPage: newPage });
        }
    }

    handlePageSizeChange(event) {
        const newPageSize = parseInt(event.target.value, 10);
        this.setState({ selectedPageSize: newPageSize, currentPage: 1 });
    }

    handleFilterChange(event) {
        const { filter } = this.state;
        const newFilter = { ...filter, [event.target.name]: event.target.value };
        this.setState({ filter: newFilter });
    }

    buildQueryString() {
        const { filter } = this.state;
        let queryString = '';
        queryString += `?pageNumber=${this.state.currentPage}&pageSize=${this.state.selectedPageSize}`;
        if(this.state.sortBy) {
            queryString += `&sortBy=${this.state.sortBy}&isAscending=${this.state.isAscending}`;
        }
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
            this.setState({ isAscending: !isAscending });
        } else {
            this.setState({ sortBy: sortColumn, isAscending: true });
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