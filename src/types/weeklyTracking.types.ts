export type WeeklyTracking = {
  id: number;
  custId: number;
  weekDate: string;
  updatdedWieght: number; // עם d מיותרת – כמו ב־DTO שלך
  isPassCalories: boolean;
    consumedCalories?: number; 
};
