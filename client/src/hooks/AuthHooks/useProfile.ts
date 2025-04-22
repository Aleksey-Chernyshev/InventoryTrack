import { useEffect, useState } from "react";
import { UserService } from "../../services/user.service";


interface UserProfile {
  id:number;
  name: string;
  email: string;
}

const useProfile = (token: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await UserService.GetProfile(token);
        setProfile(data);
      } catch (err) {
        setError("Ошибка при получении профиля");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  return { profile, loading, error };
};

export default useProfile;
