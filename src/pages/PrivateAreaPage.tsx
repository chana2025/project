import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, CircularProgress } from "@mui/material";
import { parseJwt } from "../utils/jwtUtils";
import { getCustomerById } from "../services/user.service";
import "./PrivateAreaPage.css";

import { useAppDispatch, useAppSelector } from "../redux/store";
import { matchDietsForCustomer } from "../redux/diets/Diet.slice";

export const PrivateAreaPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { matchedDiets, matchLoading, matchError } = useAppSelector(
    (state) => state.diets
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("אין טוקן ב-localStorage");
      return;
    }
    const decoded = parseJwt(token);
    const id = parseInt(decoded?.CustomerId || decoded?.customerId || "0");
    if (!id) {
      console.warn("לא נמצא CustomerId בטוקן");
      return;
    }
    setUserId(id);

    getCustomerById(id).then((res) => {
      setFullName(res.fullName || res.FullName || "משתמש");
      setEmail(res.email || res.Email || "example@mail.com");
    }).catch((err) => {
      console.error("שגיאה בטעינת פרטי משתמש:", err);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      console.log("Dispatching matchDietsForCustomer for user:", userId);
      dispatch(matchDietsForCustomer(userId));
    }
  }, [userId, dispatch]);

  return (
    <div className="private-area-wrapper">
      <div className="top-banner">
        <div className="banner-overlay">
          <div className="banner-content">
            <div className="text-part">
              <h1>שלום {fullName} 🌿</h1>
              <p>ברוכה הבאה לאזור האישי שלך</p>
            </div>
            {userId && (
              <Avatar
                src={`https://localhost:7091/api/customer/image/${userId}`}
                alt="תמונת פרופיל"
                className="banner-avatar"
              />
            )}
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="button-group">
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              if (userId) {
                console.log("לחצת התחילי התאמה, מפעיל dispatch");
                dispatch(matchDietsForCustomer(userId));
              } else {
                alert("לא זוהה משתמש");
              }
            }}
          >
            התחילי התאמה
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/weekly-tracking")}
          >
            למעקב השבועי
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/edit-profile")}
          >
            עריכת פרופיל
          </Button>
        </div>

        <div className="progress-stats">
          <div className="stat-box">
            <h3>5.2 ק"ג</h3>
            <p>ירידה במשקל</p>
          </div>
          <div className="stat-box">
            <h3>75%</h3>
            <p>עמידה בתפריט</p>
          </div>
          <div className="stat-box">
            <h3>1400</h3>
            <p>קלוריות ממוצעות</p>
          </div>
        </div>

        <div className="match-results">
          <h2>דיאטות מתאימות עבורך</h2>
          {matchLoading && <CircularProgress />}
          {matchError && <p style={{ color: "red" }}>{matchError}</p>}
          {matchedDiets.length > 0 ? (
            matchedDiets.map((diet) => (
              <div key={diet.id} className="diet-box">
                <h4>{diet.dietName}</h4>
                {diet.specialComments && <p>{diet.specialComments}</p>}
              </div>
            ))
          ) : (
            !matchLoading && <p>לא נמצאו דיאטות מתאימות.</p>
          )}
        </div>
      </div>
    </div>
  );
};
