function InputFormRow(props) {
    return (
        <>
            <td>
                <label htmlFor={props.name}>{props.label}</label>
            </td>
            <td>
                <input type={props.type} id={props.name} name={props.name} onChange={props.handleChange} value={props.value}/>
            </td>
        </>
    );
}

export default InputFormRow;