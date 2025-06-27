import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Box, Alert, TextField, Button } from "@mui/material";
import { login } from "../services/auth.service";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("נא למלא אימייל וסיסמה");
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);
      setLoading(false);

      if (result?.token) {
        localStorage.setItem("token", result.token);
        navigate("/myArea");
      } else {
        setError("שגיאה: לא התקבל טוקן");
      }
    } catch (err: any) {
      setLoading(false);
      console.error("שגיאה בהתחברות:", err);

      if (err?.response?.data) {
        setError(JSON.stringify(err.response.data));
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("שגיאה לא ידועה");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 3 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Typography component="h1" variant="h5" fontWeight={600} mb={2}>
            התחברות למערכת
          </Typography>

          <TextField
            label="אימייל"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="סיסמה"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {error}
            </Alert>
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }} disabled={loading}>
            {loading ? "טוען..." : "התחבר"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
