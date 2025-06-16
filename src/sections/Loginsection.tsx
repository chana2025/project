import { FormEvent } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

interface LoginFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="שם משתמש"
        name="name"
        autoComplete="name"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="סיסמה"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        כניסת משתמש
      </Button>
    </Box>
  );
};
