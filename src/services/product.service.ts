// src/services/productService.ts

import axios from 'axios';
import { ProductType } from '../types/ProductType.types'; // ודאי שהנתיב נכון

const API_BASE_URL = 'https://localhost:7091/'; // ודאי שזה ה-URL הנכון

export const productService = {
    // **שינוי כאן: שם המתודה השתנה ל-searchProducts**
    // היא תקרא ל-endpoint ב-C# שמחפש מוצרים לפי שם
    searchProducts: async (query: string): Promise<ProductType[]> => { // מחזירה מערך של ProductType
        try {
            const response = await axios.get<ProductType[]>(`${API_BASE_URL}/api/products/search?name=${query}`);
            return response.data; // מחזירים את כל המוצרים שנמצאו
        } catch (error) {
            console.error(`Error searching products with query "${query}":`, error);
            throw error; // זורקים את השגיאה הלאה לטיפול בקומפוננטה
        }
    },

    // הוספת מתודה לשליפת מוצר ספציפי לפי ID, כפי שנדרש ע"י ProductLookupSection
    getProductDetailsById: async (id: number): Promise<ProductType | null> => {
        try {
            const response = await axios.get<ProductType>(`${API_BASE_URL}/api/products/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product details for ID ${id}:`, error);
            throw error;
        }
    }
};