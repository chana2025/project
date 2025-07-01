import React, { useState } from 'react';
import { TextField, Button, Box, FormControlLabel, Checkbox } from '@mui/material';
import { WeeklyTracking } from '../types/weeklyTracking.types';

type Props = {
  onSubmit: (entry: WeeklyTracking) => void;
  customerId: number;
};

const WeeklyTrackerForm = ({ onSubmit, customerId }: Props) => {
  const [weight, setWeight] = useState('');
  const [isPassCalories, setIsPassCalories] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight) return;

    const newEntry: WeeklyTracking = {
      id: 0, // backend ייצר את ה-id
      custId: customerId,
      weekDate: new Date().toISOString(),
      updatedWeight: Number(weight),
      isPassCalories,
    };

    onSubmit(newEntry);
    setWeight('');
    setIsPassCalories(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
      <TextField
        label="משקל"
        type="number"
        value={weight}
        onChange={e => setWeight(e.target.value)}
        required
        inputProps={{ min: 0 }}
      />
      <FormControlLabel
        control={<Checkbox checked={isPassCalories} onChange={e => setIsPassCalories(e.target.checked)} />}
        label="עמידה בתפריט קלוריות"
      />
      <Button variant="contained" type="submit">הוסף מעקב</Button>
    </Box>
  );
};

export default WeeklyTrackerForm;
