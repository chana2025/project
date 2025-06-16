import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import './SignUp.page.css';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Avatar,
  Paper,
  Grid
} from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
//typeלמה אין התאמה ל 
  const [errors, setErrors] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setErrors("הסיסמאות אינן תואמות");
      return;
    }

    setErrors(null);

    console.log("נרשמת בהצלחה:", formData);
const formDataToSend = new FormData();
formDataToSend.append("username", formData.username);
formDataToSend.append("email", formData.email);
formDataToSend.append("password", formData.password);
formDataToSend.append("confirmPassword", formData.confirmPassword);

// אם יש גם תמונה בהמשך - תוסיפי גם formDataToSend.append("fileImage", selectedFile);

try {
  const response = await fetch("https://localhost:7240/api/SignUp", {
    method: "POST",
    body: formDataToSend,
    // אל תגדירי headers בכלל! אחרת זה לא יהיה multipart/form-data כמו ש־C# צריך
  });

  if (!response.ok) {
    throw new Error("בעיה בשליחה לשרת");
  }

  const result = await response.json();
  console.log("הצלחה מהשרת:", result);
} catch (error) {
  console.error("שגיאה:", error);
  setErrors("אירעה שגיאה בשליחה לשרת");
}

    // TODO: כאן שולחים את הנתונים לשרת
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            {/* <LockOutlinedIcon > */}
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight={600}>
            הרשמה להתאמת דיאטה
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid>
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="שם משתמש"
                  autoFocus
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid>
                <TextField
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="אימייל"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  name="password"
                  label="סיסמה"
                  type="password"
                  id="password"
                  fullWidth
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  name="confirmPassword"
                  label="אימות סיסמה"
                  type="password"
                  id="confirmPassword"
                  fullWidth
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            {errors && (
              <Typography color="error" align="center" sx={{ mt: 2 }}>
                {errors}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              הירשם עכשיו
            </Button>

            <Typography variant="body2" align="center">
              כבר רשום? <Link to="/auth/login">התחבר</Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
