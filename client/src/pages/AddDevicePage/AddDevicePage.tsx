import React, { useState } from 'react';
import { CreateDevice } from '../../hooks/DevicesHooks/device';
import styles from './AddDevicePage.module.css';
import Header from '../../components/layout/header/Header';
import AddDeviceForm from '../../components/screens/devices/AddDeviceForm/AddDeviceForm';

const AddDevicePage: React.FC = () => {
  const [deviceData, setDeviceData] = useState<any>({
    device_name: '',
    device_type_name: 'Принтер',
    device_inventory_number: '',
    device_serial_number: '',
    device_model: '',
    printer_format: '',
    printer_color: false,
    printer_cartridge: '',
    monoblock_os: '',
    monoblock_cpu: '',
    monoblock_cpu_frequency: '',
    monoblock_ram: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setDeviceData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setDeviceData({
      device_name: '',
      device_type_name: 'Принтер',
      device_inventory_number: '',
      device_serial_number: '',
      device_model: '',
      printer_format: '',
      printer_color: false,
      printer_cartridge: '',
      monoblock_os: '',
      monoblock_cpu: '',
      monoblock_cpu_frequency: '',
      monoblock_ram: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await CreateDevice(deviceData);
      setSuccessMessage('✅ Устройство успешно создано');
      setErrorMessage('');
      resetForm();

      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Ошибка при создании устройства:', error);
      setErrorMessage('❌ Ошибка при создании устройства');
      setSuccessMessage('');

      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <>
    <Header title="Добавление устройств" />
    <div className={styles.container}>
      <div className={styles.title}>Создание нового устройства</div>

      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <AddDeviceForm
        deviceData={deviceData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  </>
  );
};

export default AddDevicePage;
