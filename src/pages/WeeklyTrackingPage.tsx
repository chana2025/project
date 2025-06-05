import React, { useState } from "react";
import { WeeklyTrackerForm } from "../sections/WeeklyTrackerForm";
import { WeeklyTrackerChart } from "../sections/WeeklyTrackerChart";
import { weeklyTracking } from "../types/weeklyTracking.types";


const WeeklyTrackingPage = () => {
  const [weeklyData, setWeeklyData] = useState<weeklyTracking[]>([]);

  const handleNewData = (newEntry: weeklyTracking) => {
    setWeeklyData(prev => [...prev, newEntry]);
  };

  return (
    <div>
      <h1>מעקב שבועי</h1>
      <WeeklyTrackerForm onSubmit={handleNewData} />
      <WeeklyTrackerChart data={weeklyData} />
    </div>
  );
};

export default WeeklyTrackingPage;
