import InputFormRow from "./InputFormRow";
import Button from "./Button";
import { useState, useEffect } from "react";

function InputForm({ selectedPhone, onAddOrUpdate }) {
  const handleSubmit = selectedPhone ? updateMobilePhone : addMobilePhone;
  const [phone, setPhone] = useState({ brand: '', model: '', operatingSystem: '', storageCapacity: '', ramCapacity: '', color: '' });

  function handleChange(event) {
    setPhone({ ...phone, [event.target.name]: event.target.value });
  }


  useEffect(() => {
    if (selectedPhone) {
      setPhone({ brand: selectedPhone.brand, model: selectedPhone.model, operatingSystem: selectedPhone.operatingSystem, storageCapacity: selectedPhone.storageCapacity, ramCapacity: selectedPhone.ramCapacity, color: selectedPhone.color });
    }
  }, [selectedPhone]);

  const mobilePhones = getMobilePhones();

  function addMobilePhone() {
    const id = generateId();
    if (id !== '' && !isIdTaken(id)) {
      if (validateForm()) {
        const mobilePhone = {
          id: id,
          brand: phone.brand,
          model: phone.model,
          operatingSystem: phone.operatingSystem,
          storageCapacity: phone.storageCapacity,
          ramCapacity: phone.ramCapacity,
          color: phone.color,
        };
        const updatedMobilePhones = [...mobilePhones, mobilePhone];
        window.localStorage.setItem('mobilePhones', JSON.stringify(updatedMobilePhones));
        onAddOrUpdate(updatedMobilePhones);
      }
    }
  }

  function updateMobilePhone() {
    const phoneIndex = mobilePhones.findIndex(phone => phone.id === selectedPhone.id);
    mobilePhones[phoneIndex] = {
      id: selectedPhone.id,
      brand: phone.brand,
      model: phone.model,
      operatingSystem: phone.operatingSystem,
      storageCapacity: phone.storageCapacity,
      ramCapacity: phone.ramCapacity,
      color: phone.color
    };
    window.localStorage.setItem('mobilePhones', JSON.stringify(mobilePhones));
    onAddOrUpdate(mobilePhones);
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
    else if (parseInt(phone.storageCapacity, 10) <= 0 || isNaN(parseInt(phone.storageCapacity, 10))) {
      alert('Storage capacity must be greater than 0');
      isValid = false;
    }
    else if (parseInt(phone.ramCapacity, 10) <= 0 || isNaN(parseInt(phone.ramCapacity, 10))) {
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
              <InputFormRow label="Storage Capacity (GB):" name="storageCapacity" type="number" value={phone.storageCapacity} handleChange={handleChange} />
            </tr>
            <tr>
              <InputFormRow label="RAM Capacity (GB):" name="ramCapacity" type="number" value={phone.ramCapacity} handleChange={handleChange} />
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


function generateId() {
  const mobilePhones = getMobilePhones();
  mobilePhones.sort((a, b) => a.id - b.id);
  const lastId = mobilePhones.length > 0 ? mobilePhones[mobilePhones.length - 1].id : 0;
  return parseInt(lastId) + 1;
}

function getMobilePhones() {
  const mobilePhones = localStorage.getItem('mobilePhones');
  return mobilePhones ? JSON.parse(mobilePhones) : [];
}

function isIdTaken(id) {
  const mobilePhones = getMobilePhones();
  return mobilePhones.some(phone => phone.id === id);
}