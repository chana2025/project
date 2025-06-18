import axios from 'axios';
import { ProductType } from '../types/ProductType.types';

// **חשוב: וודא שזה ה-URL הנכון של שרת ה-Backend שלך!**
const API_BASE_URL = 'https://localhost:7091/api'; 

export const productService = {
    /**
     * מחזיר את כל המוצרים מה-Backend.
     * @returns Promise שמחזיר מערך של ProductType.
     */
    getAllProducts: async (): Promise<ProductType[]> => {
        try {
            const response = await axios.get<ProductType[]>(`${API_BASE_URL}/Product`); // Endpoint כללי לכל המוצרים
            return response.data;
        } catch (error) {
            console.error('Error fetching all products:', error);
            throw error;
        }
    },

    /**
     * מחפש מוצרים לפי שם ב-Backend.
     * @param query מחרוזת החיפוש.
     * @returns Promise שמחזיר מערך של ProductType.
     */
    searchProducts: async (query: string): Promise<ProductType[]> => {
        try {
            const response = await axios.get<ProductType[]>(`${API_BASE_URL}/Product/search?name=${query}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to search products with query "${query}":`, error);
            throw error;
        }
    },

    /**
     * מקבל פרטי מוצר לפי ID.
     * @param id מזהה המוצר.
     * @returns Promise שמחזיר ProductType או null אם לא נמצא.
     */
    getProductDetailsById: async (id: number): Promise<ProductType | null> => {
        try {
            const response = await axios.get<ProductType>(`${API_BASE_URL}/Product/${id}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                console.warn(`Product with ID ${id} not found.`);
                return null;
            }
            console.error(`Failed to fetch product details for ID ${id}:`, error);
            throw error; 
        }
    },

    /**
     * מוריד קובץ Excel של כל המוצרים.
     * @returns Promise ללא ערך החזרה (void).
     */
    downloadProductsExcel: async (): Promise<void> => {
        try {
            const response = await axios.get(`${API_BASE_URL}/Product/DownloadExcel`, {
                responseType: 'blob', // קריטי לקבצים בינאריים
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Products.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading products Excel:", error);
            throw error;
        }
    },
};