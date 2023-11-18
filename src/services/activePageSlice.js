import { createSlice } from "@reduxjs/toolkit";

const subActive = () => {
  const string = window.location.pathname.substring(
    1,
    window.location.pathname.length
  );

  return string.charAt(0).toUpperCase() + string.slice(1);
};

const initialState = {
  activePage: window.location.pathname === "/" ? "Home" : subActive(),
};

const activePageSlice = createSlice({
  name: "ActivePage",
  initialState,
  reducers: {
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
});

export const { setActivePage } = activePageSlice.actions;

export default activePageSlice.reducer;
