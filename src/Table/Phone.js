import Button from "../Form/Button";

function Phone({brand, model, operatingSystem, storageCapacity, ramCapacity, color, handleUpdate, handleDelete}) {
    
    return (
        <tr>
            <td>{brand}</td>
            <td>{model}</td>
            <td>{operatingSystem}</td>
            <td>{storageCapacity}</td>
            <td>{ramCapacity}</td>
            <td>{color}</td>
            <td className="tableButtons"><Button type="button" value="Update" onClick={handleUpdate} /></td>
            <td className="tableButtons"><Button type="button" value="Delete" onClick={handleDelete} /></td>
        </tr>
    )
}

export default Phone;