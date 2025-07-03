import React, { useState } from "react";
import { TextField, Button, Box, FormControlLabel, Checkbox } from "@mui/material";
import { WeeklyTracking } from "../types/weeklyTracking.types";

type Props = {
  onSubmit: (entry: WeeklyTracking) => void;
  customerId: number;
};

const WeeklyTrackerForm = ({ onSubmit, customerId }: Props) => {
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [isPassCalories, setIsPassCalories] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight || !calories) return;

    const newEntry: WeeklyTracking = {
      id: 0, // backend מייצר
      custId: customerId,
      weekDate: new Date().toISOString(),
      updatdedWieght: Number(weight),
      isPassCalories,
      consumedCalories: Number(calories),
    };

    onSubmit(newEntry);
    setWeight('');
    setCalories('');
    setIsPassCalories(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <TextField
        label="קג"
        type="number"
        value={weight}
        onChange={e => setWeight(e.target.value)}
        required
        inputProps={{ min: 0 }}
      />
      <TextField
        label="קלוריות שצרכת"
        type="number"
        value={calories}
        onChange={e => setCalories(e.target.value)}
        required
        inputProps={{ min: 0 }}
      />
      <FormControlLabel
        control={<Checkbox checked={isPassCalories} onChange={e => setIsPassCalories(e.target.checked)} />}
        label="עמדת בקלוריות?"
      />
      <Button type="submit" variant="contained">הוסף</Button>
    </Box>
  );
};

export default WeeklyTrackerForm;
