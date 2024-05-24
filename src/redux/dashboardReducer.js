import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // Importing necessary functions from Redux Toolkit

// Async thunk to fetch a quote
export const fetchAQuote = createAsyncThunk(
  "dashboard/fetchQuote", // Action type
  async () => {
    const res = await fetch("https://type.fit/api/quotes"); // Fetching quotes from API
    const data = await res.json(); // Converting response to JSON
    return data; // Returning quotes data
  }
);

// Initial state for dashboard slice
const initialState = {
  quote: {}, // Quote object
  lightMode: true, // Light mode flag
};

// Dashboard slice
const dashboardSlice = createSlice({
  name: "dashboard", // Slice name
  initialState: initialState, // Initial state
  reducers: {
    // Reducer to set light mode
    setMode: (state, action) => {
      // Checking localStorage for color mode
      const lightmode = localStorage.getItem("chakra-ui-color-mode");
      if (lightmode !== undefined || lightmode !== null) {
        state.lightMode = lightmode === "light" ? true : false; // Setting light mode based on localStorage
      } else {
        state.lightMode = !state.lightMode; // Toggling light mode
      }
    },
  },
  extraReducers: (builder) => {
    // Extra reducer for handling fetchAQuote fulfilled action
    builder.addCase(fetchAQuote.fulfilled, (state, action) => {
      // Generating random index to select a quote
      const quoteIndex = Math.floor(Math.random(0, 14) * 10);
      state.quote = action.payload[quoteIndex]; // Updating quote in state
    });
  },
});

// Exporting reducer, actions, and selector
export const dashReducer = dashboardSlice.reducer; // Dashboard reducer
export const dashAction = dashboardSlice.actions; // Dashboard actions
export const dashSelector = (state) => state.dashReducer; // Dashboard selector
