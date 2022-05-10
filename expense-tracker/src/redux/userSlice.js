import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    number: "",
    registerDate: "",
  },
  reducers: {
    login: (state, action) => {
      console.log(action)
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.number = action.payload.number;
      state.registerDate = action.payload.registerDate;
    },
    
    logout: (state, action) => {
      state.name = null;
      state.email = null;
      state.number = null;
      state.registerDate = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserNumber = (state) => state.user.number;
export const selectUserDate = (state) => state.user.registerDate;
export default userSlice.reducer;
