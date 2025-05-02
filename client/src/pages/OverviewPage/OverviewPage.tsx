import { TbDeviceIpadExclamation, TbDevicesPc } from "react-icons/tb";
import Header from "../../components/layout/header/Header";
import DeviceTypeChart from "../../components/screens/devices/DevicesChart/DeviceTypeChart";
import DeviceSubdivChart from "../../components/screens/devices/DevicesSubdivChart/DevicesSubdivChart";
import { useDevices } from "../../hooks/DevicesHooks/useDevices";
import { useUsers } from "../../hooks/UsersHooks/useUsers";
import { useSubdivisions } from "../../hooks/useSubdivisions";
import { FaUsers } from "react-icons/fa";
import { LuBuilding2 } from "react-icons/lu";
import StatCard from "../../shared/StatCard/StatCard";
import styles from './OverviewPage.module.css'
import MoveDevicesChart from "../../components/screens/devices/MoveDevicesChart/MoveDevicesChart";


export default function OverviewPage() {
  const token = localStorage.getItem("token") || ""; 
  const role = localStorage.getItem("role") || ""
  const { device, loading: loadingDevices } = useDevices();
  const { subdiv, loading: loadingSubdivs } = useSubdivisions();
  const { user, loading: loadingUsers } = useUsers(token);
  const unallocatedDevices = device?.filter((d) => !d.subdiv_id) || []
  if (loadingDevices || loadingSubdivs || loadingUsers) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div >
      <Header title="Обзор" />
        <div className={styles.cardContainer}>
        {role === "admin" && (
          <StatCard title="Пользователи" count={user?.length || 0} icon={<FaUsers />} />
        )}
          <StatCard title="Подразделения" count={subdiv.length} icon={<LuBuilding2 />} />
          <StatCard title="Устройства" count={device.length} icon={<TbDevicesPc />} />
          <StatCard title="Нераспределенные устройства" count={unallocatedDevices.length} icon={<TbDeviceIpadExclamation />} />
        </div>

        <div className={styles.typeChart}>
          <DeviceTypeChart />
        </div>

          <DeviceSubdivChart />
          <MoveDevicesChart />

    </div>
  );
}
