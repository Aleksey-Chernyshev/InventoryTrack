import Header from "../../components/layout/header/Header";
import DangerZone from "../../components/shared/DangerZone/DangerZone";
import Profile from "../../components/shared/Profile/Profile";
import Security from "../../components/shared/Security/Security";
import styles from "./SettingsPage.module.css"

interface Props {
  setAuth: (auth: boolean, userRole: string | null, name: string | null) => void;
}
const SettingsPage: React.FC<Props> = ({ setAuth }) => {
    return (
      <div className={styles.container}>
        <Header title="Настройки" />
        <main className={styles.main}>
            <Profile />
            <Security />
            <DangerZone setAuth={setAuth}/>

        </main>
      </div>
    );
  };
  
  export default SettingsPage;