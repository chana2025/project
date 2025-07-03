import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../utils/jwtUtils";
import { getCustomerById } from "../services/user.service";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { matchDietsForCustomer } from "../redux/diets/Diet.slice";
import { WeeklyTrackingChart } from "../sections/WeeklyTrackerChart";
import { WeeklyTracking } from "../types/weeklyTracking.types";
import { getTrackingDataByCustomer } from "../services/tracking.service";

export const PrivateAreaPage: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null); // ✅ סטייט לתמונה
  const [trackingData, setTrackingData] = useState<WeeklyTracking[]>([]);
  const [loadingTracking, setLoadingTracking] = useState(true);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { matchedDiets, matchLoading, matchError } = useAppSelector(
    (state) => state.diets
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = parseJwt(token);
    const id = parseInt(decoded?.CustomerId || decoded?.customerId || "0");
    if (!id) return;

    setUserId(id);

    getCustomerById(id)
      .then((res) => {
        setFullName(res.fullName || res.FullName || "משתמש");
        setEmail(res.email || res.Email || "example@mail.com");
        setImagePath(res.imagePath || res.ImagePath || null); // ✅ שמירה של base64 לתמונה
      })
      .catch(() => {
        setFullName("משתמש");
        setEmail("example@mail.com");
      });
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(matchDietsForCustomer(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (!userId) return;

    setLoadingTracking(true);
    setTrackingError(null);

    getTrackingDataByCustomer(userId)
      .then((data) => {
        setTrackingData(data);
      })
      .catch(() => {
        setTrackingError("שגיאה בטעינת נתוני המעקב השבועי.");
      })
      .finally(() => {
        setLoadingTracking(false);
      });
  }, [userId]);

  const weightStart =
    trackingData.length > 0 ? trackingData[0].updatdedWieght : null;
  const weightLatest =
    trackingData.length > 0
      ? trackingData[trackingData.length - 1].updatdedWieght
      : null;
  const weightDiff =
    weightStart !== null && weightLatest !== null
      ? (weightStart - weightLatest).toFixed(1)
      : "--";

  const passCaloriesCount = trackingData.filter((t) => t.isPassCalories).length;
  const passCaloriesPercent =
    trackingData.length > 0
      ? Math.round((passCaloriesCount / trackingData.length) * 100)
      : 0;

  const averageCalories =
    trackingData.length > 0
      ? Math.round(
          trackingData.reduce((sum, t) => sum + (t.consumedCalories || 0), 0) /
            trackingData.length
        )
      : 0;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Typography variant="h4" component="h1">
          שלום {fullName} 🌿
        </Typography>
        {userId && (
          <Avatar
            src={
              imagePath
                ? `data:image/jpeg;base64,${imagePath}`
                : "/assets/default-user.png"
            }
            alt="תמונת פרופיל"
            sx={{ width: 56, height: 56 }}
          />
        )}
      </Box>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3} justifyContent="space-around" textAlign="center">
          <Grid size={4}>
            <Typography variant="h5" color="primary">
              {weightDiff !== "--" ? `${weightDiff} ק"ג` : "--"}
            </Typography>
            <Typography>ירידה במשקל</Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="h5" color="primary">
              {passCaloriesPercent}%
            </Typography>
            <Typography>עמידה בתפריט</Typography>
          </Grid>
          <Grid size={4}>
            <Typography variant="h5" color="primary">
              {averageCalories}
            </Typography>
            <Typography>קלוריות ממוצעות</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 4, minHeight: 350 }}>
        <Typography variant="h6" gutterBottom>
          מעקב משקל שבועי
        </Typography>
        {loadingTracking ? (
          <Box display="flex" justifyContent="center" mt={8}>
            <CircularProgress />
          </Box>
        ) : trackingError ? (
          <Alert severity="error">{trackingError}</Alert>
        ) : trackingData.length === 0 ? (
          <Typography>אין נתוני מעקב להצגה</Typography>
        ) : (
          <WeeklyTrackingChart data={trackingData} />
        )}
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          דיאטות מתאימות עבורך
        </Typography>
        {matchLoading && <CircularProgress />}
        {matchError && <Alert severity="error">{matchError}</Alert>}
        {!matchLoading && !matchError && matchedDiets.length === 0 && (
          <Typography>לא נמצאו דיאטות מתאימות.</Typography>
        )}
        {!matchLoading &&
          matchedDiets.map((diet) => (
            <Box
              key={diet.id}
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {diet.dietName}
              </Typography>
              {diet.specialComments && (
                <Typography>{diet.specialComments}</Typography>
              )}
            </Box>
          ))}
      </Paper>

      <Box mt={4} display="flex" justifyContent="center" gap={2}>
        <Button
          variant="contained"
          color="success"
          onClick={() => userId && dispatch(matchDietsForCustomer(userId))}
        >
          התחילי התאמה
        </Button>
        <Button variant="outlined" onClick={() => navigate("/weekly-tracking")}>
          למעקב השבועי
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/edit-profile")}
        >
          עריכת פרופיל
        </Button>
      </Box>
    </Container>
  );
};
