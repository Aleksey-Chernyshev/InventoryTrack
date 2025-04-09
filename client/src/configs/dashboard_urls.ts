const API_URL = 'http://localhost:5000/api'
const DASHBOARD_URL = `${API_URL}/dashboard`
const USERS_URL = `${DASHBOARD_URL}/users`
const SUBDIVISIONS_URL = `${DASHBOARD_URL}/subdivisions`
const DEVICES_URL = `${DASHBOARD_URL}/devices`
const MOVE_DEVICE_URL = `${DASHBOARD_URL}/moveDevice`
const DEPARTMENTS_URL = `${DASHBOARD_URL}/departments`

const DashboardURL = {
    API_URL,
    DASHBOARD_URL,
    USERS_URL, 
    SUBDIVISIONS_URL,
    DEVICES_URL,
    MOVE_DEVICE_URL,
    DEPARTMENTS_URL,
}

export default DashboardURL