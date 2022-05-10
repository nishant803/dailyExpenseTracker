import { createSlice } from "@reduxjs/toolkit";
export const ExpenseSlice = createSlice({
  name: "Expense",
  initialState: {
    today: "",
    yesterday: "",
    total: 0,
    daily: 0,
    monthly: 0,
    yearly: 0,
  },
  reducers: {
    incTotal: (state, actions) => {
      state.total += actions.payload;
    },
  },
});

export const { incTotal } = ExpenseSlice.actions;
export const selectExpense = (state) => state.expense;
export default ExpenseSlice.reducer;
