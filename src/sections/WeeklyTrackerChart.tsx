import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { WeeklyTracking } from "../types/weeklyTracking.types";

type Props = {
  data: WeeklyTracking[];
};

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("he-IL", {
      day: "2-digit",
      month: "2-digit",
    });
  } catch {
    return dateString;
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          border: "1px solid #ccc",
          padding: 10,
          borderRadius: 4,
          color: "#333",
          fontSize: 14,
          boxShadow: "0 0 5px rgba(0,0,0,0.15)",
        }}
      >
        <p>תאריך: {label}</p>
        <p>משקל: {payload[0].value} ק"ג</p>
      </div>
    );
  }
  return null;
};

export const WeeklyTrackingChart: React.FC<Props> = ({ data }) => {
  if (!data.length) {
    return <p style={{ textAlign: "center" }}>אין נתונים להצגה בגרף</p>;
  }

  const chartData = data.map((item) => ({
    date: formatDate(item.weekDate),
    weight: item.updatedWeight,
  }));

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis
            domain={[
              (dataMin: number) => Math.floor(dataMin - 2),
              (dataMax: number) => Math.ceil(dataMax + 2),
            ]}
            tickCount={6}
            unit=" קג"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="weight"
            name="משקל"
            stroke="#4bc0c0"
            strokeWidth={3}
            activeDot={{ r: 8 }}
            dot={{ r: 5 }}
          />
          console.log("Weekly data:", data);

        </LineChart>
      </ResponsiveContainer>
    </div>
    
  );
};
