import React from 'react';
import styles from '../../../../pages/AddDevicePage/AddDevicePage.module.css';

interface AddDeviceFormProps {
  deviceData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const AddDeviceForm: React.FC<AddDeviceFormProps> = ({ deviceData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="device_name"
        value={deviceData.device_name}
        onChange={handleChange}
        placeholder="Название устройства"
        required
      />

      <select
        name="device_type_name"
        value={deviceData.device_type_name}
        onChange={handleChange}
      >
        <option value="Принтер">Принтер</option>
        <option value="Моноблок">Моноблок</option>
      </select>

      <input
        name="device_inventory_number"
        value={deviceData.device_inventory_number}
        onChange={handleChange}
        placeholder="Инвентарный номер"
        required
      />

      <input
        name="device_serial_number"
        value={deviceData.device_serial_number}
        onChange={handleChange}
        placeholder="Серийный номер"
        required
      />

      <input
        name="device_model"
        value={deviceData.device_model}
        onChange={handleChange}
        placeholder="Модель"
      />

      {deviceData.device_type_name === 'Принтер' && (
        <>
          <input
            name="printer_format"
            value={deviceData.printer_format}
            onChange={handleChange}
            placeholder="Формат печати"
          />
          <label>
            Цветной:
            <input
              type="checkbox"
              name="printer_color"
              checked={deviceData.printer_color}
              onChange={handleChange}
            />
          </label>
          <input
            name="printer_cartridge"
            value={deviceData.printer_cartridge}
            onChange={handleChange}
            placeholder="Картридж"
          />
        </>
      )}

      {deviceData.device_type_name === 'Моноблок' && (
        <>
          <input
            name="monoblock_os"
            value={deviceData.monoblock_os}
            onChange={handleChange}
            placeholder="ОС"
          />
          <input
            name="monoblock_cpu"
            value={deviceData.monoblock_cpu}
            onChange={handleChange}
            placeholder="Процессор"
          />
          <input
            name="monoblock_cpu_frequency"
            value={deviceData.monoblock_cpu_frequency}
            onChange={handleChange}
            placeholder="Частота CPU"
          />
          <input
            name="monoblock_ram"
            value={deviceData.monoblock_ram}
            onChange={handleChange}
            placeholder="RAM (ГБ)"
          />
        </>
      )}

      <button className={styles.button_create} type="submit">
        Создать устройство
      </button>
    </form>
  );
};

export default AddDeviceForm;