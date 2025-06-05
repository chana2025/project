import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { weeklyTracking } from "../types/weeklyTracking.types";

type Props = {
  data: weeklyTracking[];
};

export const WeeklyTrackerChart = ({ data }: Props) => {
  const formattedData = data.map(item => ({
    date: new Date(item.WeakDate).toLocaleDateString(),
    weight: item.UpdatdedWieght
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formattedData}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};
