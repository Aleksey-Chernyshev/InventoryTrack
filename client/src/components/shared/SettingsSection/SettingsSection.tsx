import { ReactNode } from "react";
import styles from "./SettingsSection.module.css";

interface SettingSectionProps {
	icon: React.ComponentType<{ size?: number; className?: string }>;
	title: string;
	children: ReactNode;
}

const SettingSection: React.FC<SettingSectionProps> = ({ icon: Icon, title, children }) => {
	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<Icon className={styles.icon} size={24} />
				<h2 className={styles.title}>{title}</h2>
			</div>
			{children}
		</div>
	);
};

export default SettingSection;
