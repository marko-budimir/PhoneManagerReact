import InputFormRow from "./InputFormRow";
import Button from "./Button";

function InputForm({ isUpdating = false }) {
  const handleSubmit = isUpdating ? updateMobilePhone : addMobilePhone;

  return (
    <div className="container">
      <h3>{isUpdating ? "Update phone" : "Add a new phone"}</h3>
      <form id={isUpdating ? "updateMobilePhoneForm" : "addMobilePhoneForm"}>
        <table>
          <tbody>
            <tr>
              <InputFormRow label="Brand:" name="brand" type="text" />
            </tr>
            <tr>
              <InputFormRow label="Model:" name="model" type="text" />
            </tr>
            <tr>
              <InputFormRow label="Operating System:" name="operatingSystem" type="text" />
            </tr>
            <tr>
              <InputFormRow label="Storage Capacity (GB):" name="storageCapacity" type="number" />
            </tr>
            <tr>
              <InputFormRow label="RAM Capacity (GB):" name="ramCapacity" type="number" />
            </tr>
            <tr>
              <InputFormRow label="Color:" name="color" type="text" />
            </tr>
            <tr>
              <td />
              <td>
                <Button type="submit" value={isUpdating ? "Update phone" : "Add phone"} onClick={handleSubmit} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

function updateMobilePhone() {
  const form = document.getElementById('updateMobilePhoneForm');
  const id = form.id.value;
  const brand = form.brand.value;
  const model = form.model.value;
  const operatingSystem = form.operatingSystem.value;
  const storageCapacity = form.storageCapacity.value;
  const ramCapacity = form.ramCapacity.value;
  const color = form.color.value;

  const mobilePhones = getMobilePhones();
  const phoneIndex = mobilePhones.findIndex(phone => phone.id === id);
  mobilePhones[phoneIndex] = {
    id,
    brand,
    model,
    operatingSystem,
    storageCapacity,
    ramCapacity,
    color
  };
  window.localStorage.setItem('mobilePhones', JSON.stringify(mobilePhones));
}

export default InputForm;

function addMobilePhone() {
  const form = document.getElementById('addMobilePhoneForm');
  const id = generateId();
  const brand = form.brand.value;
  const model = form.model.value;
  const operatingSystem = form.operatingSystem.value;
  const storageCapacity = form.storageCapacity.value;
  const ramCapacity = form.ramCapacity.value;
  const color = form.color.value;

  const mobilePhones = getMobilePhones();
  if (id != '' && !isIdTaken(id)) {
    const mobilePhone = {
      id,
      brand,
      model,
      operatingSystem,
      storageCapacity,
      ramCapacity,
      color
    };
    mobilePhones.push(mobilePhone);
    
    window.localStorage.setItem('mobilePhones', JSON.stringify(mobilePhones));
  }
}

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