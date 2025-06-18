// src/services/auth.service.ts

import axios from "./axios"; // נניח שזה מכיל את ה-baseURL הנכון ל-https://localhost:7091
import { SignupData } from "../types/SignUp.Types"; // זה ה-DTO שלך ב-Frontend

// *** שינוי: baseUrl צריך להיות "SignUp" כדי להתאים ל-SignUpController ב-C# ***
const baseUrl = "SignUp"; 

export const login = async (userName: string, password: string) => {
  const response = await axios.post<string>(`${baseUrl}/login`, { userName, password });
  return response.data;
};

export const signUp = async (signupData: SignupData) => {
  // *** שינוי: יש לשלוח את הנתונים כ-FormData בגלל ה-IFormFile וה-[FromForm] ב-C# ***
  const formData = new FormData();
  formData.append('FullName', signupData.fullName);
  formData.append('Email', signupData.email);
  formData.append('Phone', signupData.phone);
  formData.append('Password', signupData.password);
 // שלח כ-string, ה-backend ימיר ל-enum

  // שדות אופציונליים
  if (signupData.height !== undefined && signupData.height !== null) {
    formData.append('Height', signupData.height.toString());
  }
  if (signupData.weight !== undefined && signupData.weight !== null) {
    formData.append('Weight', signupData.weight.toString());
  }
  
  // הוספת קובץ התמונה אם קיים
  if (signupData.fileImage) {
    formData.append('FileImage', signupData.fileImage); // הוסף את הקובץ ישירות
  }

  // *** שינוי: ה-URL הוא רק baseUrl, כי זו בקשת POST כללית לקונטרולר ***
  // (אין צורך ב- /register אם המתודה ב-C# היא Post() ללא Route מפורש)
  const response = await axios.post(`${baseUrl}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // חשוב כדי שה-Backend יזהה FormData
    },
  });
  return response.data;
};