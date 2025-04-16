import React, { FC, useState } from "react";
import Modal from "../../../../shared/Modal/Modal";
import InputFormAuth from "../../../../shared/InputFormAuth/InputFormAuth";
import styles from "../../users/EditUsersModal/EditUsersModal.module.css";
import { IDevice } from "../../../../hooks/DevicesHooks/useDevices";
import { useSubdivisions } from "../../../../hooks/useSubdivisions";
import { useDepartments } from "../../../../hooks/useDepartments";
import { DevicesService } from "../../../../services/devices.service";



interface MovingDevicesModalProps {
  selectedMovingDevice: IDevice | null;
  movingModal: boolean;
  closeMovingModal: () => void;
  refetchDevice: () => Promise<void>;
}

const MovingDevicesModal: FC<MovingDevicesModalProps> = ({
  selectedMovingDevice,
  movingModal,
  closeMovingModal,
  refetchDevice,
}) => {

  const [selectedSubdivId, setSelectedSubdivId] = useState<number | null>(null);
  const [selectedDeptId, setSelectedDeptId] = useState<number | null>(null);
  const {loading, error, subdiv} = useSubdivisions()
  const { departments, loading: loadingDepts, error: errorDepts } = useDepartments(selectedSubdivId);

  const handleSubdivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    setSelectedSubdivId(isNaN(id) ? null : id);
    setSelectedDeptId(null);
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    setSelectedDeptId(isNaN(id) ? null : id);
  };

  const handleSaveChanges = async () => {
    if (
      selectedMovingDevice &&
      selectedDeptId !== null &&
      selectedSubdivId !== null &&
      typeof selectedDeptId === 'number'
    ) {
      try {
        const user_id_raw = localStorage.getItem("user_id");
        const user_id = user_id_raw ? Number(user_id_raw) : null;
    
        if (user_id === null) {
          console.error("user_id не найден в localStorage");
          return;
        }
    
        await DevicesService.MoveDevice({
          device_id: selectedMovingDevice.device_id,
          from_department_id: selectedMovingDevice.from_department_id!,
          to_department_id: selectedDeptId,
          moved_by_user: user_id
        });
    

            refetchDevice();
            closeMovingModal(); 
        } catch (error) {
            console.error("Ошибка при перемещении устройства:", error);
        }
    } else {
        console.log("Пожалуйста, выберите подразделение и отдел.");
    }
};


  return (
    <Modal active={movingModal} onClose={closeMovingModal} style={{ width: "500px", height: "500px" }}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Выполним перемещение устройства</h2>
        <form className={styles.formContainer}>
            <p><strong>Устройство:</strong> {selectedMovingDevice?.device_name}</p>
            <p><strong>Текущее местоположение:</strong> {selectedMovingDevice?.department_name} ({selectedMovingDevice?.subdiv_name})</p>

            <p><strong>Выбираем новое расположение устройства</strong></p>
            <label>Выберите подразделение</label>
              {loading ? (
              <p>Загрузка подразделений...</p>
            ) : error ? (
              <p style={{ color: "red" }}>Ошибка загрузки: {error}</p>
            ) : (
              <select
                id="subdivision"
                value={selectedSubdivId ?? ""} onChange={handleSubdivisionChange}
                className={styles.input}
              >
                <option value="">-- Выберите подразделение --</option>
                {subdiv.map((item) => (
                  <option key={item.subdiv_id} value={item.subdiv_id}>
                    {item.subdiv_name}
                  </option>
                ))}
              </select>
            )}


              {selectedSubdivId && (
                          <>
                            <label>Выберите отдел</label>
                            {loadingDepts ? (
                              <p>Загрузка отделов...</p>
                            ) : errorDepts ? (
                              <p className={styles.error}>{errorDepts}</p>
                            ) : (
                              <select value={selectedDeptId ?? ""} onChange={handleDepartmentChange} className={styles.input}>
                                <option value="">-- Выберите отдел --</option>
                                {Array.isArray(departments) && departments.map((d) => (
                                  <option key={d.department_id} value={d.department_id}>
                                    {d.department_name}
                                  </option>
                                ))}
                              </select>
                            )}
                          </>
                        )}


            <button className={styles.btn} type="button" onClick={handleSaveChanges}>
                Переместить
            </button>
        </form>
      </div>
    </Modal>
  );
};

export default MovingDevicesModal;
