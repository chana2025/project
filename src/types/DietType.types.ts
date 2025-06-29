export interface DietType {
    id: number;
    dietName: string;
    calories?: number;
    protein?: number;
    fat?: number;
    carbohydrates?: number;
    specialComments?: string;
    imageUrl?: string;
    // אם בעתיד תצטרכי גם את רשימת הלקוחות או המוצרים – נוסיף אותם כאן
  }