export type WeeklyTracking = {
  id: number;
  custId: number;
  weekDate: string; // ISO string
  updatedWeight: number;
  isPassCalories: boolean;
};
