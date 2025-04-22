import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingSection from "../SettingsSection/SettingsSection";
import styles from "./DangerZone.module.css";
import { CgDanger } from "react-icons/cg";

import { AccountService } from "../../../services/account.service";
import DeleteAccountModal from "../../screens/users/DeleteAccountModal/DeleteAccountModal";

interface DangerZoneProps {
  setAuth: (auth: boolean, userRole: string | null, name: string | null) => void;
}
const DangerZone: React.FC<DangerZoneProps> = ({ setAuth }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || "";
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");

      if (isAdmin) {
        await AccountService.DeleteSelf(token);
      } else {
        await AccountService.RequestAccountDeletion(token);
      }

      setAuth(false, null, null);
      
      navigate("/login");
    } catch (err) {
      console.error("Ошибка при удалении аккаунта:", err);
      setError("Не удалось удалить аккаунт. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingSection icon={CgDanger} title={"Опасная зона"}>

      <p className={styles.description}>
        Удаление аккаунта или других необратимых действий.
      </p>

      {error && <p className={styles.error}>{error}</p>}

      <button
        className={styles.deleteButton}
        onClick={() => setModalOpen(true)}
        disabled={isLoading}
      >
        {isLoading ? "Удаление..." : "Удалить аккаунт"}
      </button>

      <DeleteAccountModal
        isOpen={isModalOpen}
        isAdmin={isAdmin}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </SettingSection>
  );
};

export default DangerZone;
