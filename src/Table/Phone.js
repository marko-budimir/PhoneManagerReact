import Button from "../Form/Button";

function Phone(params) {
    
    return (
        <tr>
            <td>{params.brand}</td>
            <td>{params.model}</td>
            <td>{params.operatingSystem}</td>
            <td>{params.storageCapacity}</td>
            <td>{params.ramCapacity}</td>
            <td>{params.color}</td>
            <td><Button type="button" value="Update" onClick={params.handleUpdate} /></td>
            <td><Button type="button" value="Delete" onClick={params.handleDelete} /></td>
        </tr>
    )
}

export default Phone;