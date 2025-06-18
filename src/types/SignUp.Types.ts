// src/types/SignUp.Types.ts

// הגדרת enum eRole ב-Frontend כדי להתאים ל-C#
export enum eRole {
    ADMIN = 0, // וודאי שהערכים המספריים תואמים ל-C# enum
    WORKER = 1,
    USER = 2
    
}

export type SignupData = {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    
    // *** שינוי: הוספת שדה Role, חשוב שיהיה תואם ל-C# ***
    role: eRole; 

    // *** שינויים: תיקון שגיאות כתיב והתאמה ל-C# (Height, Weight) ***
    // שימו לב ש-Height ו-Weight הם אופציונליים (number | null) כי הם יכולים להיות null ב-Dto ב-C#
    height: number | null; 
    weight: number | null; 

    // *** הוספת FileImage כטיפוס File ***
    fileImage?: File | null; // זהו קובץ שיישלח כ-FormData

    // *** שינויים: התאמה לשדות הקיימים ב-C# SignUpDto ***
    likedProductIds?: number[]; // אופציונליים כי יכולים להיות מוגדרים כ-new() ב-Backend
    dislikedProductIds?: number[]; // אופציונליים כי יכולים להיות מוגדרים כ-new() ב-Backend

    // *** הסרת confirmPassword - הוא רק לוולידציה ב-Frontend ***
    // confirmPassword: string; 

    // *** הסרת gender - אם הוא לא נשמר ב-Backend CustomerDto ***
    // gender: eGender; 
};

// אם את עדיין צריכה את eGender עבור דברים אחרים ב-Frontend,
// אפשר להשאיר אותו, אבל הוא לא רלוונטי ל-SignUpDto ב-Backend.
export enum eGender{
    MALE = 0, // וודאי שגם כאן הערכים המספריים נכונים
    FEMALE = 1
}