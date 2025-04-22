import { useState } from "react"
import styles from "./Sidebar.module.css"
import classNames from "classnames"
import { IoMdMenu } from "react-icons/io"
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5"
import { FaUsers } from "react-icons/fa"
import { GrOverview } from "react-icons/gr"
import { TbDevicesPc } from "react-icons/tb"
import { TbDeviceIpadExclamation } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { CgProfile } from "react-icons/cg"
import { LuBuilding2 } from "react-icons/lu";
import { MdAddToQueue } from "react-icons/md";
import { useDevices } from "../../../hooks/DevicesHooks/useDevices"

const SIDEBAR_ITEMS = [
	{ name: "Обзор", color: "#6366f1", icon: GrOverview, path: "/dashboard" },          
	{ name: "Устройства", color: "#7C3AED", icon: TbDevicesPc, path: "/dashboard/devices" }, 
	{ name: "Добавить устройство", color: "#A855F7", icon: MdAddToQueue, path: "/dashboard/create-device" },
	{ name: "Нераспределенные устройства", color: "#EC4899", icon: TbDeviceIpadExclamation, path: "/dashboard/unallocated-device" },
	{ name: "Пользователи", color: "#F43F5E", icon: FaUsers, path: "/dashboard/users", adminOnly: true }, 
	{ name: "Подразделения", color: "#10B981", icon: LuBuilding2, path: "/dashboard/subdivisions" }, 
	// { name: "Admin", color: "#06B6D4", icon: RiAdminFill, path: "/dashboard/admin", adminOnly: true },
	{ name: "Настройки", color: "#06B6D4", icon: IoSettingsOutline, path: "/dashboard/settings" },
	
];
interface SidebarProps {
	setAuth: (boolean: boolean, userRole: string | null,userName: string | null) => void
	role: string | null
	userName: string | null
  }
  const Sidebar: React.FC<SidebarProps> = ({ setAuth, role, userName }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)
	const navigate = useNavigate()
	const location = useLocation()
	const { device } = useDevices()

	const unallocatedCount = device.filter(d => !d.subdiv_id).length
  
	const logout = () => {
	  localStorage.removeItem('token')
	  localStorage.removeItem('role')
	  localStorage.removeItem('name')
	  setAuth(false, null, null )
	  navigate('/login');
	};
  
	return (
	  <div className={classNames(styles.sidebar, { [styles.closed]: !isSidebarOpen })}>
		<div className={styles.sidebar_container}>
		  <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={styles.menu_button}>
			<IoMdMenu size={24} />
		  </button>
  
		  <nav className={styles.sidebar_nav}>
			<div className={styles.sidebar_item}>
			  <CgProfile size={20} style={{ minWidth: "20px" }} />
			  <span className={styles.sidebar_text}>{userName}</span>
			</div>
  
			{SIDEBAR_ITEMS.filter(item => !(item.adminOnly && role !== "admin")).map((item) => {
				const isActive = location.pathname === item.path
				const showUnallocatedBadge = item.path === "/dashboard/unallocated-device" && unallocatedCount > 0
				return (
					<Link
						key={item.path}
						to={item.path}
						className={classNames(styles.link, {
							[styles.active]: isActive,
						})}
						style={isActive ? { "--active-bg": item.color } as React.CSSProperties : {}}
					>
						<div className={styles.sidebar_item}>
						<div className={styles.iconWrapper}>
							<item.icon
								size={20}
								style={{
									color: isActive ? "white" : item.color,
									minWidth: "20px",
								}}
							/>
							{showUnallocatedBadge && (
								<span className={styles.badge}>{unallocatedCount}</span>
							)}
						</div>
							<span className={styles.sidebar_text}>{item.name}</span>
						</div>
					</Link>
				)
			})}

		  </nav>
		  <button onClick={logout} className={classNames(styles.logout_button, styles.sidebar_item)}>
			<IoLogOutOutline size={25} style={{ minWidth: "20px" }} />
			<span className={styles.sidebar_text}>Выйти</span>
		  </button>
		</div>
	  </div>
	)
  }
  
export default Sidebar;
