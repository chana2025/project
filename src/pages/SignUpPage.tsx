import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import React from "react";
export const SignUpPage = () => {
    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        // הוספת לוגיקה שקשורה להרשמה
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                <Typography component="h1" variant="h5">
                    הרשמה
                </Typography>
                <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="שם משתמש"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="כתובת דואל"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="סיסמה"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="אמת סיסמה"
                        type="password"
                        id="confirmPassword"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        הרשמה
                    </Button>
                    <Typography variant="body2" align="center">
                        כבר רשום? <Link to='/auth/login'>התחבר</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}