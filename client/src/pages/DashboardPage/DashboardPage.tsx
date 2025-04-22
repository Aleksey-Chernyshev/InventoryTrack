import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../../components/layout/sidebar/Sidebar'
import UsersPage from '../UsersPage/UsersPage'
import AdminPage from '../AdminPage/AdminPage'
import style from './Dashboard.module.css'
import OverviewPage from '../OverviewPage/OverviewPage'
import SubdivisionsPage from '../SubdivisionsPage/SubdivisionsPage'
import DevicesPage from '../DevicesPage/DevicesPage'
import SubdivDevicesPage from '../SubdivDevicesPage/SubdivDevicesPage'
import AddDevicePage from '../AddDevicePage/AddDevicePage'
import UnallocatedDevicesPage from '../UnallocatedDevicesPage/UnallocatedDevicesPage'
import SettingsPage from '../SettingsPage/SettingsPage'

interface Props {
  setAuth: (boolean: boolean, userRole: string | null) => void
  role: string | null
  userName: string | null
}

const DashboardPage: React.FC<Props> = ({ setAuth, role, userName }) => {
  return (
    <Fragment>
      <div className={style.app_container}>
        <Sidebar setAuth={setAuth} role={role} userName={userName} />
        <div className={style.content}>
          <Routes>
            <Route path="/" element={<OverviewPage/>} />
            <Route path="/users" element={role === "admin" ? <UsersPage /> : <div>Доступ запрещен</div>} />
            <Route path="/subdivisions" element={<SubdivisionsPage />} />
            <Route path="/subdivisions/:subdivId" element={<SubdivDevicesPage />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/create-device" element={<AddDevicePage />} />
            <Route path="/unallocated-device" element={<UnallocatedDevicesPage/>}/>
            <Route path="/settings" element={<SettingsPage setAuth={setAuth}/>} />
            <Route path="/admin" element={role === "admin" ? <AdminPage /> : <div>Доступ запрещен</div>} />
          </Routes>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardPage;
