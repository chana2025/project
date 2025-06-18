// import axios from 'axios';
// import {DietType  } from "../types/DietType.types";

// // שנה לכתובת ה-URL של ה-Backend שלך
// // לדוגמה: 'https://localhost:7000' או 'https://yourdomain.com/api'
// const API_BASE_URL = 'YOUR_BACKEND_API_BASE_URL'; 

// export const dietService = {
//     getAllDiets: async (): Promise<DietType[]> => {
//         try {
//             const response = await axios.get<DietType[]>(`${API_BASE_URL}/api/diets`);
//             // אנו מניחים שה-backend מחזיר TimeMeals כ-string או שלא משתמשים בו ישירות
//             // אם ה-backend שולח TimeMeals כ-Date[] בפורמט ISO, אין צורך בשינוי.
//             // אחרת, ייתכן שתרצה להמיר אותו אם TimeMealsString מכיל זמנים בלבד.
//             return response.data;
//         } catch (error) {
//             console.error("Error fetching diets:", error);
//             throw error;
//         }
//     },
//     getDietById: async (id: number): Promise<DietType> => {
//         try {
//             const response = await axios.get<DietType>(`${API_BASE_URL}/api/diets/${id}`);
//             return response.data;
//         } catch (error) {
//             console.error(`Error fetching diet with ID ${id}:`, error);
//             throw error;
//         }
//     }
// };


// src/services/diet.service.ts

import axios from 'axios';
import { DietType } from "../types/DietType.types";

// ודאי שזה הפורט הנכון של השרת שלך!
const API_BASE_URL = 'https://localhost:7091'; 

export const dietService = {
    getAllDiets: async (): Promise<DietType[]> => {
        try {
            // *** תיקון סופי: הנתיב צריך להיות /api/DietType ***
            const response = await axios.get<DietType[]>(`${API_BASE_URL}/api/DietType`);
            return response.data;
        } catch (error) {
            console.error("Error fetching diets:", error);
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                console.warn("No diets found.");
                return []; 
            }
            throw error;
        }
    },
    getDietById: async (id: number): Promise<DietType> => {
        try {
            // *** תיקון סופי: הנתיב צריך להיות /api/DietType/{id} ***
            const response = await axios.get<DietType>(`${API_BASE_URL}/api/DietType/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching diet with ID ${id}:`, error);
            throw error;
        }
    }
};