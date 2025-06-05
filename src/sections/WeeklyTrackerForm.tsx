import React, { useState } from "react";
import { weeklyTracking } from "../types/weeklyTracking.types";

type Props = {
  onSubmit: (data: weeklyTracking) => void;
};

export const WeeklyTrackerForm = ({ onSubmit }: Props) => {
  const [weight, setWeight] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight < 35) {
      setError(" המשקל צריך להיות לפחות 35 ק״ג - פנה בדחיפות למרפאה");
      return;
    }

    const data: weeklyTracking = {
      Id: Date.now(),
      CustId: 1,
      WeakDate: new Date(),
      UpdatdedWieght: weight,
      IsPassCalories: weight > 70 // דוגמה
    };
    onSubmit(data);
    setWeight(0);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>הכנס משקל:</label>
      <input
        type="number"
        value={weight}
        min={35}
        onChange={(e) => setWeight(parseFloat(e.target.value))}
      />
      <button type="submit">שמור</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};
