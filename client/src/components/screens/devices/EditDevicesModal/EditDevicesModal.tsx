import React, { FC } from "react";
import Modal from "../../../../shared/Modal/Modal";
import InputFormAuth from "../../../../shared/InputFormAuth/InputFormAuth";
import styles from "../../users/EditUsersModal/EditUsersModal.module.css";
import { IDevice } from "../../../../hooks/DevicesHooks/useDevices";

interface EditDeviceModalProps {
  selectedDevice: IDevice | null;
  editModal: boolean;
  closeEditModal: () => void;
  updatedDeviceData: any;
  handleChange: ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleUpdate: (id: number) => void;
}

const EditDevicesModal: FC<EditDeviceModalProps> = ({
  selectedDevice,
  editModal,
  closeEditModal,
  updatedDeviceData,
  handleChange,
  handleUpdate,
}) => {
  if (!selectedDevice) return null;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    handleChange({
      ...e,
      target: {
        ...e.target,
        name,
        value: checked.toString(),
      },
    });
  };

  const renderDeviceSpecificFields = () => {
    switch (selectedDevice.device_type_name) {
      case "Принтер":
        return (
          <>
            <p>Формат</p>
            <InputFormAuth
                    name="printer_format"
                    value={updatedDeviceData.printer_format || ""}
                    onChange={handleChange}
                    placeholder="Формат" type={""}            />
            <p>
              <input
                type="checkbox"
                name="printer_color"
                checked={updatedDeviceData.printer_color === "true"}
                onChange={handleCheckboxChange}
              />
              Цветной
            </p>
            <p>Картридж</p>
            <InputFormAuth
                    name="printer_cartridge"
                    value={updatedDeviceData.printer_cartridge || ""}
                    onChange={handleChange}
                    placeholder="Картридж" type={""}            />
          </>
        );
      case "Моноблок":
        return (
          <>
            <p>ОС</p>
            <InputFormAuth
                    name="monoblock_os"
                    value={updatedDeviceData.monoblock_os || ""}
                    onChange={handleChange}
                    placeholder="ОС" type={""}            />
            <p>Процессор</p>
            <InputFormAuth
                    name="monoblock_cpu"
                    value={updatedDeviceData.monoblock_cpu || ""}
                    onChange={handleChange}
                    placeholder="Процессор" type={""}            />
            <p>Частота</p>
            <InputFormAuth
                    name="monoblock_cpu_frequency"
                    value={updatedDeviceData.monoblock_cpu_frequency || ""}
                    onChange={handleChange}
                    placeholder="ГГц" type={""}            />
            <p>ОЗУ</p>
            <InputFormAuth
                    name="monoblock_ram"
                    value={updatedDeviceData.monoblock_ram || ""}
                    onChange={handleChange}
                    placeholder="RAM" type={""}            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal active={editModal} onClose={closeEditModal} style={{ width: "500px", height: "auto" }}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Редактировать устройство</h2>
        <form className={styles.formContainer}>
          <div className={styles.formGroup}>
            <p><strong>Название:</strong> {selectedDevice.device_name}</p>
            <p><strong>Статус устройства:</strong></p>
              <select
                name="device_status"
                value={updatedDeviceData.device_status || ""}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">-- Выберите статус --</option>
                <option value="Активен">Активен</option>
                <option value="В ремонте">В ремонте</option>
              </select>
          </div>
          {renderDeviceSpecificFields()}
          <button className={styles.btn} type="button" onClick={() => handleUpdate(selectedDevice.device_id)}>
            Сохранить
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditDevicesModal;
