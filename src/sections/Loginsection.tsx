import { FormEvent } from "react";
import { TextField, Button, Box } from "@mui/material";

interface LoginFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        required
        fullWidth
        id="email"
        name="email"
        label="אימייל"
        autoComplete="email"
        autoFocus
      />
      <TextField
        required
        fullWidth
        id="password"
        name="password"
        label="סיסמה"
        type="password"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2, py: 1.2, fontWeight: 600 }}
      >
        התחבר
      </Button>
    </Box>
  );
};
