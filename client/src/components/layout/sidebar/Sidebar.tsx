
import { useState } from "react";
import styles from "./Sidebar.module.css"; 
import classNames from "classnames";
import { IoMdMenu } from "react-icons/io";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { GrOverview } from "react-icons/gr";
import { TbDevicesPc } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const SIDEBAR_ITEMS = [
	{ name: "Overview", color: "#6366f1", icon:GrOverview, path:'/overview'},
	{ name: "Devices", color: "#8B5CF6",  icon:TbDevicesPc, path:'/devices'},
	{ name: "Users", color: "#EC4899", icon:FaUsers, path:'/dashboard/users'},
	{ name: "Admin",  color: "#10B981" , icon: RiAdminFill, path:'/dashboard/admin', adminOnly: true},
	{ name: "Settings",  color: "#6EE7B7" , icon: IoSettingsOutline, path:'/settings'},
	
];
interface SidebarProps {
	setAuth: (boolean: boolean, userRole: string | null) => void
	role: string | null;
  }
const Sidebar: React.FC<SidebarProps> = ({setAuth,role}) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const navigate = useNavigate()
	const logout = () => {
		localStorage.removeItem('token')
		setAuth(false, null)
		navigate('/login')
	  };

	return (
		<div className={classNames(styles.sidebar, { [styles.closed]: !isSidebarOpen })}>
			<div className={styles.sidebar_container}>
				<button
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className={styles.menu_button}
				>
					<IoMdMenu size={24}/>
				</button>

				<nav className={styles.sidebar_nav}>
					{SIDEBAR_ITEMS.filter(item => !(item.adminOnly && role !== "admin")).map((item) => (
						<Link key={item.path} to={item.path}>
							<span key={item.name}>
								<div className={styles.sidebar_item}>
									<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
									<span className={styles.sidebar_text}>{item.name}</span>
								</div>
							</span>
						</Link>
					))}
				</nav>
				<button
				onClick={logout}
				>
				<IoLogOutOutline size={20}/>
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
