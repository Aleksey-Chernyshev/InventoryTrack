import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { DevicesService } from "../../services/devices.service";


export interface IDeviceSubdivDistribution {
  subdiv_name: string;
  total: number;
}

export function useDevicesDistributionBySubdiv() {
  const [distribution, setDistribution] = useState<IDeviceSubdivDistribution[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  async function fetchDevicesDistribution() {
    try {
      setLoading(true);
      const response = await DevicesService.GetDevicesDistributionBySubdiv();
      setDistribution(response);
      setLoading(false);
    } catch (e: unknown) {
      setError('Ошибка загрузки данных');
      setLoading(false);
      const err = e as AxiosError;
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchDevicesDistribution();
  }, []);

  return { distribution, loading, error, refetch: fetchDevicesDistribution };
}
