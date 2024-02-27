function Phone(params) {
    
    return (
        <tr>
            <td>{params.brand}</td>
            <td>{params.model}</td>
            <td>{params.operatingSystem}</td>
            <td>{params.storageCapacity}</td>
            <td>{params.ramCapacity}</td>
            <td>{params.color}</td>
        </tr>
    )
}

export default Phone;