import InputFormRow from "./InputFormRow";
import Button from "./Button";
import { useState, useEffect } from "react";
import { addMobilePhone, updateMobilePhone, getMobilePhone } from "../services/PhoneService";
import { useNavigate, useParams } from "react-router-dom";

function InputForm() {
  const { id } = useParams();
  const handleSubmit = id ? handleUpdatePhone : handleAddPhone;
  const [phone, setPhone] = useState({ brand: '', model: '', operatingSystem: '', storageCapacityGB: '', ramGB: '', color: '' });
  const navigate = useNavigate();

  
  const [selectedPhone, setSelectedPhone] = useState(null);
  useEffect(() => {
    if (id) {
      getMobilePhone(id).then(response => {
        setSelectedPhone(response);
      });
    }
  }, []);

  function handleChange(event) {
    setPhone({ ...phone, [event.target.name]: event.target.value });
  }


  useEffect(() => {
    if (selectedPhone) {
      setPhone({ brand: selectedPhone.brand, model: selectedPhone.model, operatingSystem: selectedPhone.operatingSystem, storageCapacityGB: selectedPhone.storageCapacityGB, ramGB: selectedPhone.ramGB, color: selectedPhone.color });
    }
  }, [selectedPhone]);


  function handleAddPhone() {
    try {
      if (validateForm()) {
        addMobilePhone(phone).then(response => {
          setPhone({ brand: '', model: '', operatingSystem: '', storageCapacityGB: '', ramGB: '', color: '' });
          navigate('/');
          if (response !== 201) {
            alert('Error adding phone');
          }
        });
      }
    }
    catch (error) {
      console.error('Error adding mobile phone:', error);
    }
  }

  function handleUpdatePhone() {
    try {
      if (validateForm()) {
        updateMobilePhone(selectedPhone.id, phone).then(response => {
          navigate('/');
          if (response !== 200) {
            alert('Error updating phone');
          }
        });
      }
    }
    catch (error) {
      console.error('Error updating mobile phone:', error);
    }
  }

  function validateForm() {
    let isValid = true;
    if (!phone.brand.trim()) {
      alert('Brand is required');
      isValid = false;
    }
    else if (!phone.model.trim()) {
      alert('Model is required');
      isValid = false;
    }
    else if (!phone.operatingSystem.trim()) {
      alert('Operating system is required');
      isValid = false;
    }
    else if (parseInt(phone.storageCapacityGB, 10) <= 0 || isNaN(parseInt(phone.storageCapacityGB, 10))) {
      alert('Storage capacity must be greater than 0');
      isValid = false;
    }
    else if (parseInt(phone.ramGB, 10) <= 0 || isNaN(parseInt(phone.ramGB, 10))) {
      alert('RAM capacity must be greater than 0');
      isValid = false;
    }
    else if (!phone.color.trim()) {
      alert('Color is required');
      isValid = false;
    }

    return isValid;
  }

  return (
    <div className="container">
      <h3>{selectedPhone ? "Update phone" : "Add a new phone"}</h3>
      <form id={selectedPhone ? "updateMobilePhoneForm" : "addMobilePhoneForm"}>
        <table>
          <tbody>
            <tr>
              <InputFormRow label="Brand:" name="brand" type="text" value={phone.brand} handleChange={handleChange} />
            </tr>
            <tr>
              <InputFormRow label="Model:" name="model" type="text" value={phone.model} handleChange={handleChange} />
            </tr>
            <tr>
              <InputFormRow label="Operating System:" name="operatingSystem" type="text" value={phone.operatingSystem} handleChange={handleChange} />
            </tr>
            <tr>
              <InputFormRow label="Storage Capacity (GB):" name="storageCapacityGB" type="number" value={phone.storageCapacityGB} handleChange={handleChange} />
            </tr>
            <tr>
              <InputFormRow label="RAM Capacity (GB):" name="ramGB" type="number" value={phone.ramGB} handleChange={handleChange} />
            </tr>
            <tr>
              <InputFormRow label="Color:" name="color" type="text" value={phone.color} handleChange={handleChange} />
            </tr>
            <tr>
              <td />
              <td>
                <Button type="button" value={selectedPhone ? "Update phone" : "Add phone"} onClick={handleSubmit} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default InputForm;