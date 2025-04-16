import React from 'react'

 
import { useDevices } from '../../hooks/DevicesHooks/useDevices'
import DevicesTable from '../../components/screens/devices/DevicesTable/DevicesTable'
import Header from '../../components/layout/header/Header'

const UnallocatedDevicesPage: React.FC = () => {
  const { device, loading } = useDevices()
  const unallocatedDevices = device.filter((d) => !d.subdiv_id)

  return (
    <div>
        <Header title={'Нераспределенные устройства'} />
        {loading ? (
            <p>Загрузка...</p>
        ) : unallocatedDevices.length > 0 ? (
            <DevicesTable showUnallocatedOnly />
        ) : (
            <p>Нераспределённые устройства отсутствуют</p>
        )}
    </div>
  )
}

export default UnallocatedDevicesPage
