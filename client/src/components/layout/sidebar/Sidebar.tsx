
import { useState } from "react";
import styles from "./Sidebar.module.css"; // Подключаем стили

const SIDEBAR_ITEMS = [
	{ name: "Overview", color: "#6366f1" },
	{ name: "Products", color: "#8B5CF6"  },
	{ name: "Users", color: "#EC4899"  },
	{ name: "Sales",  color: "#10B981"},
	{ name: "Orders",  color: "#F59E0B" },
	{ name: "Analytics",  color: "#3B82F6" },
	{ name: "Settings",  color: "#6EE7B7" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<div className={`styles.sidebar ${isSidebarOpen ? "" : "closed"}`}>
			<div className={styles.sidebar_container}>
				<button
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className="menu-button"
				>
					{/* <Menu size={24} /> */}
				</button>

				<nav className={styles.sidebar_nav}>
					{SIDEBAR_ITEMS.map((item) => (
						<span key={item.name}>
							<div className={styles.sidebar_item}>
								{/* <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} /> */}
								<span className={styles.sidebar_text}>{item.name}</span>
							</div>
						</span>
					))}
				</nav>
			</div>
		</div>
	);
};

export default Sidebar;
