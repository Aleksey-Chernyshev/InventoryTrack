import { useState } from "react"
import styles from "./Sidebar.module.css"
import classNames from "classnames"
import { IoMdMenu } from "react-icons/io"
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5"
import { FaUsers } from "react-icons/fa"
import { GrOverview } from "react-icons/gr"
import { TbDevicesPc } from "react-icons/tb"
import { RiAdminFill } from "react-icons/ri"
import { Link, useNavigate } from "react-router-dom"
import { CgProfile } from "react-icons/cg"
import { LuBuilding2 } from "react-icons/lu";

const SIDEBAR_ITEMS = [
	{ name: "Overview", color: "#6366f1", icon:GrOverview, path:'/dashboard'},
	{ name: "Devices", color: "#8B5CF6",  icon:TbDevicesPc, path:'/devices'},
	{ name: "Users", color: "#EC4899", icon:FaUsers, path:'/dashboard/users'},
	{ name: "Subdivisions", color: "#CF1859", icon:LuBuilding2, path:'/dashboard/subdivisions'},
	{ name: "Admin",  color: "#10B981" , icon: RiAdminFill, path:'/dashboard/admin', adminOnly: true},
	{ name: "Settings",  color: "#6EE7B7" , icon: IoSettingsOutline, path:'/settings'},
	
];
interface SidebarProps {
	setAuth: (boolean: boolean, userRole: string | null,userName: string | null) => void
	role: string | null
	userName: string | null
  }
  const Sidebar: React.FC<SidebarProps> = ({ setAuth, role, userName }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)
	const navigate = useNavigate()
  
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
  
			{SIDEBAR_ITEMS.filter(item => !(item.adminOnly && role !== "admin")).map((item) => (
			  <Link key={item.path} to={item.path}>
				<div className={styles.sidebar_item}>
				  <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
				  <span className={styles.sidebar_text}>{item.name}</span>
				</div>
			  </Link>
			))}
		  </nav>
		  <button onClick={logout}>
			<IoLogOutOutline size={20} />
		  </button>
		</div>
	  </div>
	)
  }
  
export default Sidebar;
