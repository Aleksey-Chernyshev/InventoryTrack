import { Fragment, useEffect } from "react"
import { IDevice, useDevices } from "../../../../hooks/DevicesHooks/useDevices"
import styles from "../../users/UsersTable/UsersTable.module.css"
import { IoSearchOutline } from "react-icons/io5"
import { useMemo, useState } from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { DeleteDevice, UpdateDevice } from "../../../../hooks/DevicesHooks/device"
import EditDevicesModal from "../EditDevicesModal/EditDevicesModal"
import MovingDevicesModal from "../MovingDevicesModal/MovingDevicesModal"

const DevicesTable: React.FC = () => {
    const { loading, error, device, refetchDevice } = useDevices()
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [selectedDevice, setSelectedDevice] = useState<IDevice | null>(null)
    const [selectedMovingDevice, setSelectedMovingDevice] = useState<IDevice | null>(null)
    const [editModal, setEditModal] = useState(false)
    const [movingModal, setMovingModal] = useState(false)
    const [updatedDeviceData, setUpdatedDeviceData] = useState<any>({})

    useEffect(() => {
        if (selectedDevice) {
            setUpdatedDeviceData({
                ...selectedDevice,
                printer_color: selectedDevice.printer_color ? "true" : "false",
            });
        }
    }, [selectedDevice])

    const filteredDevices = useMemo(() => {
        return device.filter((device) => {
            const matchesSearchTerm =
                device.device_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                device.device_type_name.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesStatus = statusFilter
                ? device.device_status === statusFilter
                : true;

            const isNotDeleted = device.device_status !== "Неактивен"

            return matchesSearchTerm && matchesStatus && isNotDeleted
        });
    }, [device, searchTerm, statusFilter])

    const closeMovingModal = () => {
        setMovingModal(false)
        setSelectedMovingDevice(null)
    };
    
    const closeEditModal = () => {
        setEditModal(false)
        setSelectedDevice(null)
        setUpdatedDeviceData({})
    };

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setUpdatedDeviceData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async (id: number) => {
        try {
            const payload = {
                ...updatedDeviceData,
                device_type_name: selectedDevice?.device_type_name,
                printer_color: updatedDeviceData.printer_color === "true",
            };
            await UpdateDevice(id, payload);
            refetchDevice();
            closeEditModal();
        } catch (error) {
            console.error("Ошибка при обновлении устройства:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await DeleteDevice(id);
            refetchDevice();
        } catch (error) {
            console.error("Ошибка при удалении:", error);
        }
    };


    

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), "dd MMMM yyyy", { locale: ru })
    };

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p style={{ color: "red" }}>Ошибка: {error}</p>

    return (
        <Fragment>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h2>Список устройств</h2>
                    <div className={styles.searchBox}>
                        <IoSearchOutline className={styles.searchIcon} size={18} />
                        <input
                            type="text"
                            placeholder="Поиск устройств..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.filterBox}>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className={styles.statusFilter}
                        >
                            <option value="">Все статусы</option>
                            <option value="Активен">Активен</option>
                            <option value="В ремонте">В ремонте</option>
                        </select>
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Название</th>
                                <th>Тип</th>
                                <th>Инвентарный номер</th>
                                <th>Серийный номер</th>
                                <th>Модель</th>
                                <th>Дата ввода в эксплуатацию</th>
                                <th>Статус</th>
                                <th>Расположение</th>
                                <th>Доп. информация</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDevices.map((device) => (
                                <tr key={device.device_id}>
                                    <td>{device.device_id}</td>
                                    <td>{device.device_name}</td>
                                    <td>{device.device_type_name}</td>
                                    <td>{device.device_inventory_number}</td>
                                    <td>{device.device_serial_number}</td>
                                    <td>{device.device_model || "—"}</td>
                                    <td>{formatDate(device.device_date_commissioning) || "—"}</td>
                                    <td>{device.device_status || "—"}</td>
                                    <td>{device.department_name ? `${device.department_name} (${device.subdiv_name})` : "—"}</td>
                                    <td>
                                        {device.device_type_name === "Принтер" && (
                                            <>
                                                <p>Формат: {device.printer_format}</p>
                                                <p>Цветной: {device.printer_color ? "Да" : "Нет"}</p>
                                                <p>Картридж: {device.printer_cartridge || "—"}</p>
                                            </>
                                        )}
                                        {device.device_type_name === "Моноблок" && (
                                            <>
                                                <p>ОС: {device.monoblock_os}</p>
                                                <p>Процессор: {device.monoblock_cpu}</p>
                                                <p>Частота: {device.monoblock_cpu_frequency} ГГц</p>
                                                <p>ОЗУ: {device.monoblock_ram} ГБ</p>
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        <div className={styles.buttons_container}>
                                            <button 
                                                className={`${styles.button} ${styles.move}`}
                                                onClick={() =>{
                                                    setSelectedMovingDevice(device);
                                                    setMovingModal(true);
                                                }}
                                            >Переместить</button>
                                            <button
                                                className={`${styles.button} ${styles.edit}`}
                                                onClick={() => {
                                                    setSelectedDevice(device);
                                                    setEditModal(true);
                                                }}
                                            >
                                                Изменить
                                            </button>
                                            <button
                                                className={`${styles.button} ${styles.delete}`}
                                                onClick={() => handleDelete(device.device_id)}
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <MovingDevicesModal
                selectedMovingDevice={selectedMovingDevice}
                movingModal={movingModal}
                closeMovingModal={closeMovingModal}        
                refetchDevice={refetchDevice} 
             />
            <EditDevicesModal
                selectedDevice={selectedDevice}
                editModal={editModal}
                closeEditModal={closeEditModal}
                updatedDeviceData={updatedDeviceData}
                handleChange={handleChange}
                handleUpdate={handleUpdate}
            />
        </Fragment>
    )
}

export default DevicesTable;
