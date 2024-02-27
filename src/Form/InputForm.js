import InputFormRow from "./InputFormRow";
import Button from "./Button";
import { useState, useEffect } from "react";

function InputForm({ selectedPhone }) {
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
      const mobilePhone = {
        id: id,
        brand: phone.brand,
        model: phone.model,
        operatingSystem: phone.operatingSystem,
        storageCapacity: phone.storageCapacity,
        ramCapacity: phone.ramCapacity,
        color: phone.color
      };
      mobilePhones.push(mobilePhone);
      window.localStorage.setItem('mobilePhones', JSON.stringify(mobilePhones));
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
                <Button type="submit" value={selectedPhone ? "Update phone" : "Add phone"} onClick={handleSubmit} />
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