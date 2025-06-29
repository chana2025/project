import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DietType } from "../../types/DietType.types";

type DietState = {
  diets: DietType[];
  matchedDiets: DietType[];
  loading: boolean;
  matchLoading: boolean;
  error: string | null;
  matchError: string | null;
};

const initialState: DietState = {
  diets: [],
  matchedDiets: [],
  loading: false,
  matchLoading: false,
  error: null,
  matchError: null,
};

// הוסף טיפוס מפורש ל-Thunk שיחזיר מערך DietType
export const fetchDiets = createAsyncThunk<DietType[]>(
  "diets/fetchAll",
  async () => {
    const res = await axios.get<DietType[]>("https://localhost:7091/api/DietType");
    return res.data;
  }
);

export const matchDietsForCustomer = createAsyncThunk<DietType[], number>(
  "diets/matchForCustomer",
  async (customerId: number) => {
    const res = await axios.get<DietType[]>(`https://localhost:7091/api/DietType/match-diet/${customerId}`);
    return res.data;
  }
);

const dietSlice = createSlice({
  name: "diets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiets.fulfilled, (state, action) => {
        state.loading = false;
        state.diets = action.payload;
      })
      .addCase(fetchDiets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בעת שליפת הדיאטות";
      })
      .addCase(matchDietsForCustomer.pending, (state) => {
        state.matchLoading = true;
        state.matchError = null;
      })
      .addCase(matchDietsForCustomer.fulfilled, (state, action) => {
        state.matchLoading = false;
        // וידוא ש-action.payload הוא מערך ולא null
        const diets = Array.isArray(action.payload) ? action.payload : [];
        state.matchedDiets = diets.filter(diet => diet != null);
      })
      .addCase(matchDietsForCustomer.rejected, (state, action) => {
        state.matchLoading = false;
        state.matchError = action.error.message || "שגיאה בהתאמת הדיאטה";
      });
  },
});

export default dietSlice.reducer;
