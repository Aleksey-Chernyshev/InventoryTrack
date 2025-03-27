import styles from "./Header.module.css"
import logo from '../../../assets/images/logo.png'
interface HeaderProps{
    title: string
}
const Header: React.FC<HeaderProps> = ({ title }) => {
	return (
		<header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.appInfo}>
          <span className={styles.appName}>InventoryTrack</span>
          <img src={logo} alt="App Logo" className={styles.logo} />
          
        </div>
      </div>
    </header>
	);
};
export default Header;