import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useDevicesDistributionByType } from "../../../../hooks/DevicesHooks/useDevicesDistributionByType";
import styles from "./DeviceTypeChart.module.css";  // Импортируешь CSS-модуль

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];

const DeviceTypePieChart: React.FC = () => {
  const { distribution, loading, error } = useDevicesDistributionByType();


  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  const formattedDistribution = distribution.map(item => ({
    ...item,
    count: Number(item.count) || 0, 
  }));

  if (!formattedDistribution.length) return <p>Нет данных для отображения</p>;

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>Распределение устройств по типам</h2>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={formattedDistribution}
            dataKey="count"
            nameKey="device_type_name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {formattedDistribution.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DeviceTypePieChart;
