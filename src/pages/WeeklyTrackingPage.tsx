import React, { useEffect, useState } from "react";
import { Container, Alert, CircularProgress } from "@mui/material";
import WeeklyTrackerForm from "../sections/WeeklyTrackerForm";
import { WeeklyTrackingChart } from "../sections/WeeklyTrackerChart";
import { WeeklyTracking } from "../types/weeklyTracking.types";
import {
  getTrackingDataByCustomer,
  addTrackingEntry,
} from "../services/tracking.service";

export const WeeklyTrackingPage: React.FC = () => {
  const [data, setData] = useState<WeeklyTracking[]>([]);
  const [entryAdded, setEntryAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    if (!userId) {
      setError("אנא התחברי למערכת כדי לראות את המעקב שלך.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const result = await getTrackingDataByCustomer(userId);
        setData(result);
      } catch (err) {
        setError("שגיאה בטעינת נתוני המעקב.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [entryAdded, userId]);

  const handleAddEntry = async (entry: WeeklyTracking) => {
    try {
      await addTrackingEntry(entry);
      setEntryAdded((prev) => !prev);
    } catch (err) {
      console.error("שגיאה בשמירת נתוני המעקב", err);
    }
  };

  if (loading) return <CircularProgress sx={{ m: 5 }} />;
  if (error)
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="warning">{error}</Alert>
      </Container>
    );

  return (
    <Container sx={{ py: 4, minHeight: '400px', display: 'flex', flexDirection: 'column', gap: 3 }}>
  <h2>📅 המעקב השבועי שלך</h2>
  <WeeklyTrackerForm onSubmit={handleAddEntry} customerId={userId} />
  <div style={{ flexGrow: 1, minHeight: 300 }}>
    <WeeklyTrackingChart data={data} />
  </div>
</Container>

  );
};

export default WeeklyTrackingPage;
