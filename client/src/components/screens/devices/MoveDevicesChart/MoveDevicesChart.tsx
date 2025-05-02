
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

import styles from "./MoveDevicesChart.module.css";
import { format, parseISO } from "date-fns";
import { useMoveDevices } from "../../../../hooks/DevicesHooks/useMoveDevices";



export default function MoveDevicesLineChart() {
  const {moveDevices} = useMoveDevices()

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.title}>Перемещения устройств по датам</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={moveDevices}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tickFormatter={(str) => {
              const date = parseISO(str);
              return format(date, "dd.MM.yyyy"); 
            }}
          />
          <YAxis
            allowDecimals={false}
            domain={[0, 'auto']}
            ticks={[0, 5, 10, 15, 20, 25, 30]}
          />
          <Tooltip labelFormatter={(label) => {
            const date = parseISO(label);
            return format(date, "dd.MM.yyyy"); 
          }} />
          <Line type="monotone" dataKey="moves" stroke="#6366f1" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
