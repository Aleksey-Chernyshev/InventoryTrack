import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import styles from './DeviceSubdivChart.module.css';  // Импорт стилей
import { useDevicesDistributionBySubdiv } from "../../../../hooks/DevicesHooks/useGetDevicesDistributionBySubdiv";

const DeviceSubdivBarChart: React.FC = () => {
  const { distribution, loading, error } = useDevicesDistributionBySubdiv();

  // Логирование для проверки, что данные приходят
  console.log("distribution", distribution);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  // Преобразуем данные, если нужно
  const formattedDistribution = distribution.map(item => ({
    ...item,
    total: Number(item.total) || 0, 
  }));

  if (!formattedDistribution.length) return <p>Нет данных для отображения</p>;

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>Количество устройств по подразделениям</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedDistribution}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray=" 3" />
          <XAxis type="number" />
          <YAxis
            dataKey="subdiv_name"
            type="category"
            width={200}
            tick={{ fontSize: 12 }}
            interval={0}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DeviceSubdivBarChart;
