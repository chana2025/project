import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import './SignUp.page.css';
import LikedProductsAutocomplete from "../sections/LikedProductsAutocomplete";
import DislikedProductsAutocomplete from "../sections/DislikedProductsAutocomplete";

import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Avatar,
  Paper,
  Grid,
} from "@mui/material";

import { SelectChangeEvent } from '@mui/material/Select';

import { SignupData, eRole } from "../types/SignUp.Types";
import { signUp } from "../services/auth.service";
import { ProductType } from "../types/ProductType.types"
import { productService } from "../services/product.service";

const isValidEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    height: null,
    weight: null,
    role: eRole.USER,
    fileImage: null,
    likedProductIds: [],
    dislikedProductIds: [],
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("שגיאה בטעינת מוצרים:", error);
      }
    };

    fetchProducts();
  }, []);

  type FormFieldNames = keyof SignupData;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as FormFieldNames;

    setFormData((prev) => ({
      ...prev,
      [key]: key === "height" || key === "weight" ? (value === "" ? null : parseFloat(value)) : value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent<eRole>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof SignupData]: value as eRole,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, fileImage: e.target.files![0] }));
    } else {
      setFormData((prev) => ({ ...prev, fileImage: null }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setSuccessMessage(null);

    if (!isValidEmail(formData.email)) {
      setErrors("פורמט המייל אינו תקין.");
      return;
    }

    if (formData.password !== confirmPassword) {
      setErrors("הסיסמאות אינן תואמות");
      return;
    }

    if (formData.role === eRole.USER) {
      if (formData.height === null || formData.height <= 0 || formData.weight === null || formData.weight <= 0) {
        setErrors("משתמשים רגילים חייבים לספק גובה ומשקל תקינים.");
        return;
      }
    }

    try {
      await signUp(formData);
      setSuccessMessage("נרשמת בהצלחה! הנך מועבר לדף ההתחברות...");

      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);

    } catch (error: any) {
      console.error("שגיאה בהרשמה:", error);
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors("אירעה שגיאה כללית בהרשמה. אנא נסה שוב.");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }} />
          <Typography component="h1" variant="h5" fontWeight={600}>
            הרשמה להתאמת דיאטה
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid size={12}>
                <TextField
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="שם מלא"
                  autoFocus
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="אימייל"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="טלפון"
                  value={formData.phone}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  name="height"
                  fullWidth
                  id="height"
                  label="גובה (ס''מ)"
                  type="number"
                  value={formData.height === null ? "" : formData.height}
                  onChange={handleChange}
                  inputProps={{ step: "0.1" }}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  name="weight"
                  fullWidth
                  id="weight"
                  label="משקל (ק''ג)"
                  type="number"
                  value={formData.weight === null ? "" : formData.weight}
                  onChange={handleChange}
                  inputProps={{ step: "0.1" }}
                />
              </Grid>

<Grid size={12}>
  <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 2, bgcolor: '#fafafa' }}>
    <Typography variant="subtitle1" fontWeight={600} mb={1} textAlign="right">
      מוצרים אהובים
    </Typography>
    <LikedProductsAutocomplete
      products={products}
      selectedProductIds={formData.likedProductIds ?? []}
      onChange={(newIds) =>
        setFormData((prev) => ({ ...prev, likedProductIds: newIds }))
      }
    />
  </Box>
</Grid>

<Grid size={12}>
  <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 2, bgcolor: '#fafafa' }}>
    <Typography variant="subtitle1" fontWeight={600} mb={1} textAlign="right">
      מוצרים שנואים
    </Typography>
    <DislikedProductsAutocomplete
      products={products}
      selectedProductIds={formData.dislikedProductIds ?? []}
      onChange={(newIds) =>
        setFormData((prev) => ({ ...prev, dislikedProductIds: newIds }))
      }
    />
  </Box>
</Grid>



              <Grid size={12}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{ mt: 1, mb: 1.5, py: 1 }}
                >
                  בחר תמונת פרופיל
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Button>
                {formData.fileImage && (
                  <Typography variant="body2" color="textSecondary" align="center">
                    קובץ נבחר: **{formData.fileImage.name}**
                  </Typography>
                )}
              </Grid>

            </Grid>

            {errors && (
              <Typography color="error" align="center" sx={{ mt: 2 }}>
                {errors}
              </Typography>
            )}

            {successMessage && (
              <Typography color="primary" align="center" sx={{ mt: 2 }}>
                {successMessage}
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
