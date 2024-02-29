import Button from "../Form/Button";
import { Link } from "react-router-dom";

function Phone({ brand, model, operatingSystem, storageCapacity, ramCapacity, color, id, handleDelete }) {

    return (
        <tr>
            <td>{brand}</td>
            <td>{model}</td>
            <td>{operatingSystem}</td>
            <td>{storageCapacity}</td>
            <td>{ramCapacity}</td>
            <td>{color}</td>
            <td className="tableButtons">
                <Link to={`/edit/${id}`}>
                    <Button type="button" value="Update" />
                </Link>
            </td>
            <td className="tableButtons"><Button type="button" value="Delete" onClick={handleDelete} /></td>
        </tr>
    )
}

export default Phone;