import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { DevicesService } from "../../services/devices.service";


export interface IMoveDevice {
    date: string;
    moves: number;
}

export function useMoveDevices() {
  const [moveDevices, setMoveDevices] = useState<IMoveDevice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  async function fetchMoveDevices() {
    try {
      setLoading(true);
      const response = await DevicesService.GetMoveDevices();
      setMoveDevices(response);
      setLoading(false);
    } catch (e: unknown) {
      setError('Ошибка загрузки данных');
      setLoading(false);
      const err = e as AxiosError;
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchMoveDevices();
  }, []);

  return { moveDevices, loading, error, refetch: fetchMoveDevices };
}
