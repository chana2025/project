import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { parseJwt } from "../utils/jwtUtils";
import { getCustomerById } from "../services/user.service";
import "./PrivateAreaPage.css";

export const PrivateAreaPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = parseJwt(token);
    const id = parseInt(decoded?.CustomerId || "0");
    if (!id) return;
    setUserId(id);

    getCustomerById(id).then((res) => {
      setFullName(res.fullName || res.FullName || "משתמש");
      setEmail(res.email || res.Email || "example@mail.com");
    });
  }, []);

  return (
    <div className="private-area-container">
      <div className="profile-header">
        <h1>ברוך הבא לאזור האישי</h1>
        <p>כאן תוכל לעקוב אחרי ההתקדמות שלך</p>
      </div>

      <div className="profile-card">
        {userId && (
          <Avatar
            src={`https://localhost:7091/api/customer/image/${userId}`}
            alt="תמונת פרופיל"
            className="profile-avatar"
          />
        )}
        <h2>{fullName}</h2>
        <p>{email}</p>

        <div className="profile-stats">
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

        <Button
          variant="contained"
          color="success"
          onClick={() => navigate("/edit-profile")}
        >
          עריכת פרופיל
        </Button>
      </div>
    </div>
  );
};
