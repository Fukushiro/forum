import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  username: string;
  loged: boolean;
}

const initialState: UserState = {
  id: "",
  username: "",
  loged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
