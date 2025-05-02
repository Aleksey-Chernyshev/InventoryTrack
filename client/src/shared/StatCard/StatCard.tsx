import React from "react";
import styles from "./StatCard.module.css";

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, icon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.textBlock}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.count}>{count}</p>
      </div>
      <div className={styles.icon}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
