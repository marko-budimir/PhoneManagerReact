function InputFormRow({name, label, type, handleChange, value, isDisabled}) {
    return (
        <>
            <td>
                <label htmlFor={name}>{label}</label>
            </td>
            <td>
                <input type={type} id={name} name={name} onChange={handleChange} value={value} disabled={isDisabled}/>
            </td>
        </>
    );
}

export default InputFormRow;