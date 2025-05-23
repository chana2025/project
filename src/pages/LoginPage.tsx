import { FormEvent } from "react"
import { Link, useNavigate } from "react-router"
import { login } from "../services/auth.service"
import { setSession } from "../auth/auth.utils"
import { useAppDispatch } from "../redux/store"
import { setAuth } from "../redux/auth/auth.slice"
import { eRole } from "../types/customer.types"
import { TextField, Button, Typography, Container, Box } from '@mui/material'
import React from "react"

export const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        try {
            const name: string = formData.get('name')?.toString()!
            const token = await login(name || '', formData.get('password')?.toString() || '')
            setSession(token)
            const user = {
                id: 1,
                name,
                role: eRole.ADMIN,
                phone: '0527694257',
                email: 'chani@gmail.com',
                address: '',
            }
            dispatch(setAuth(user))
            navigate('/home')
        } catch (error) {
            console.error('Login failed', error); // הוספת ניהול שגיאות
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                <Typography component="h1" variant="h5">
                    כניסת משתמש
                </Typography>
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        כניסת משתמש
                    </Button>
                    <Typography variant="body2" align="center">
                        עדיין לא רשום? <Link to='/auth/sign-up'>הרשם</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}