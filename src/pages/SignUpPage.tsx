// import React, { useState, FormEvent } from "react";
// import { Link } from "react-router-dom";
// import './SignUp.page.css';
// import {
//   TextField,
//   Button,
//   Typography,
//   Container,
//   Box,
//   Avatar,
//   Paper,
//   Grid
// } from "@mui/material";
// // import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// export const SignUpPage = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
// //typeלמה אין התאמה ל 
//   const [errors, setErrors] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const onSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     const { password, confirmPassword } = formData;

//     if (password !== confirmPassword) {
//       setErrors("הסיסמאות אינן תואמות");
//       return;
//     }

//     setErrors(null);

//     console.log("נרשמת בהצלחה:", formData);
// const formDataToSend = new FormData();
// formDataToSend.append("username", formData.username);
// formDataToSend.append("email", formData.email);
// formDataToSend.append("password", formData.password);
// formDataToSend.append("confirmPassword", formData.confirmPassword);

// // אם יש גם תמונה בהמשך - תוסיפי גם formDataToSend.append("fileImage", selectedFile);

// try {
//   const response = await fetch("https://localhost:7240/api/SignUp", {
//     method: "POST",
//     body: formDataToSend,
//     // אל תגדירי headers בכלל! אחרת זה לא יהיה multipart/form-data כמו ש־C# צריך
//   });

//   if (!response.ok) {
//     throw new Error("בעיה בשליחה לשרת");
//   }

//   const result = await response.json();
//   console.log("הצלחה מהשרת:", result);
// } catch (error) {
//   console.error("שגיאה:", error);
//   setErrors("אירעה שגיאה בשליחה לשרת");
// }

//     // TODO: כאן שולחים את הנתונים לשרת
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 3 }}>
//         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//           <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
//             {/* <LockOutlinedIcon > */}
//           </Avatar>
//           <Typography component="h1" variant="h5" fontWeight={600}>
//             הרשמה להתאמת דיאטה
//           </Typography>
//           <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid>
//                 <TextField
//                   name="username"
//                   required
//                   fullWidth
//                   id="username"
//                   label="שם משתמש"
//                   autoFocus
//                   value={formData.username}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid>
//                 <TextField
//                   name="email"
//                   required
//                   fullWidth
//                   id="email"
//                   label="אימייל"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid size={12}>
//                 <TextField
//                   name="password"
//                   label="סיסמה"
//                   type="password"
//                   id="password"
//                   fullWidth
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid size={12}>
//                 <TextField
//                   name="confirmPassword"
//                   label="אימות סיסמה"
//                   type="password"
//                   id="confirmPassword"
//                   fullWidth
//                   required
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                 />
//               </Grid>
//             </Grid>

//             {errors && (
//               <Typography color="error" align="center" sx={{ mt: 2 }}>
//                 {errors}
//               </Typography>
//             )}

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               sx={{ mt: 3, mb: 2, py: 1.5 }}
//             >
//               הירשם עכשיו
//             </Button>

//             <Typography variant="body2" align="center">
//               כבר רשום? <Link to="/auth/login">התחבר</Link>
//             </Typography>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };


// src/pages/SignUp.tsx
// src/pages/SignUp.tsx
// src/pages/SignUp.tsx

import React, { useState, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import './SignUp.page.css';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Avatar,
  Paper,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select'; // ייבוא SelectChangeEvent במפורש

import { SignupData, eRole } from "../types/SignUp.Types";

const isValidEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

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

  // פונקציה לטיפול בשינויים מ-TextFields (ומזהים דומים)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // פונקציה חדשה לטיפול בשינויים מרכיב Select בלבד
  const handleSelectChange = (event: SelectChangeEvent<eRole>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name as keyof SignupData]: value as eRole
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
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
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
                <FormControl fullWidth>
                  <InputLabel id="role-select-label">תפקיד</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select"
                    name="role"
                    value={formData.role}
                    label="תפקיד"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value={eRole.USER}>משתמש</MenuItem>
                  </Select>
                </FormControl>
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

function signUp(formData: SignupData) {
  throw new Error("Function not implemented.");
}
