// // src/types/ProductType.ts
// export type ProductType = {
//     productId: number; // ✅ שינוי: מ-Id ל-productId (אותיות קטנות בהתחלה)
//     Name: string; // אם אתה משתמש ב-Name באות גדולה, זה בסדר
//     // אם אתה רוצה עקביות מלאה ב-TS, שנה את כל השדות ל-camelCase:
//     // name: string;
//     // calories: number;
//     // ...
//     Calories: number;
//     Protein: number;
//     Fat: number;
//     Carbohydrates: number;
//     SourceApi: string|null;
// }


// src/types/ProductType.types.ts
export interface ProductType {
    productId: number;       // נשאר productId (p קטנה, I גדולה)
    name: string;            // שינוי ל-name (n קטנה)
    calories: number;        // שינוי ל-calories (c קטנה)
    protein: number;         // שינוי ל-protein (p קטנה)
    fat: number;             // שינוי ל-fat (f קטנה)
    carbohydrates: number;   // שינוי ל-carbohydrates (c קטנה)
    sourceApi: string | null; // שינוי ל-sourceApi (s קטנה, A גדולה)
}
