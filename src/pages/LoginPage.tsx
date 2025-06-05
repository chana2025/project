import React, { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../services/auth.service"
import { setSession } from "../auth/auth.utils"
import { useAppDispatch } from "../redux/store"
import { setAuth } from "../redux/auth/auth.slice"
import { customer, eGender, eRole } from "../types/customer.types"
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material'

export const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [error, setError] = useState<string | null>(null)

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')?.toString() || ''
        const password = formData.get('password')?.toString() || ''

        try {
            const token = await login(email, password)
            setSession(token)

            // 💡 כאן את יכולה להחליף בהמשך בקבלת פרטי משתמש אמיתיים מהשרת
            const user: customer = {
                CustomerId: 1,
                FullName: email,
                Gender: eGender.FEMAIL,
                Phone: '0527694257',
                Email: email,
                Heigth: 170,
                Weigth: '60',
                Password: '',
                DietId: 0,
                Role: eRole.ADMIN,
                ImageUrl: ''
            }

            dispatch(setAuth(user))
            navigate('/home')
        } catch (err) {
            console.error('Login failed', err)
            setError('כתובת מייל או סיסמה שגויים.')
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                <Typography component="h1" variant="h5">
                    כניסת משתמש
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="אימייל"
                        name="email"
                        autoComplete="email"
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        כניסת משתמש
                    </Button>
                    <Typography variant="body2" align="center">
                        עדיין לא רשום? <Link to='/auth/sign-up'>הרשמה</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}
