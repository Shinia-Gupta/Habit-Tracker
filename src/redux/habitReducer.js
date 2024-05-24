import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice function from Redux Toolkit

// Initial state for habit slice
const initialState = {
  habits: [], // Array to store all habits
  filteredHabits: [], // Array to store filtered habits
  showAddForm: false, // Flag to show/hide add habit form
  showDeleteConfirmation: false, // Flag to show/hide delete confirmation dialog
  habitInfo: null, // Information about the habit
  pendingHabits: 0, // Count of pending habits
  completedHabits: 0, // Count of completed habits
  incompleteHabits: 0, // Count of incomplete habits
};

// Habit slice containing reducers
const habitSlice = createSlice({
  name: "habit", // Slice name
  initialState: initialState, // Initial state
  reducers: {
    // Reducer to set habits
    setHabits: (state, action) => {
      state.habits = [...action.payload]; // Setting habits array
      state.filteredHabits = [...action.payload]; // Setting filtered habits array
    },

    // Reducer to toggle add habit form visibility
    setShowAddForm: (state, action) => {
      state.showAddForm = !state.showAddForm; // Toggling showAddForm flag
    },

    // Reducer to toggle delete confirmation dialog visibility and set habit info
    setDeleteConfirmation: (state, action) => {
      state.showDeleteConfirmation = !state.showDeleteConfirmation; // Toggling showDeleteConfirmation flag
      state.habitInfo = action.payload; // Setting habit info
    },

    // Reducer to add a new habit
    addHabit: (state, action) => {
      state.habits = [...state.habits, action.payload]; // Adding new habit to habits array
      state.filteredHabits = [...state.habits]; // Updating filteredHabits array

      // Updating localStorage with updated habits array
      localStorage.removeItem("habits");
      localStorage.setItem("habits", JSON.stringify(state.habits));
    },

    // Reducer to update habit status
    updateHabit: (state, action) => {
      const { id, dayIndex, value, todayDate } = action.payload; // Extracting payload data
      const habit = state.habits.find((h) => h.id === id); // Finding habit by id

      // Updating habit status and todayStatus
      habit.days[dayIndex].currentStatus = value;
      if (habit.days[dayIndex].date === todayDate) {
        habit.todayStatus = value;
      }

      // Updating localStorage with updated habits array
      localStorage.removeItem("habits");
      localStorage.setItem("habits", JSON.stringify(state.habits));
    },

    // Reducer to update habit counts
    updateCount: (state, action) => {
      // Calculating counts for pending, completed, and incomplete habits
      const pCount = state.habits.filter(
        (h) => h.todayStatus === "pending"
      ).length;
      const cCount = state.habits.filter(
        (h) => h.todayStatus === "complete"
      ).length;
      const icCount = state.habits.filter(
        (h) => h.todayStatus === "incomplete"
      ).length;

      // Updating state with counts
      state.pendingHabits = pCount;
      state.completedHabits = cCount;
      state.incompleteHabits = icCount;
    },

    // Reducer to delete a habit
    deleteHabit: (state, action) => {
      // Filtering out the habit to be deleted
      const newHabits = state.habits.filter(
        (habit) => habit.id !== action.payload
      );
      state.habits = [...newHabits]; // Updating habits array
      state.filteredHabits = [...state.habits]; // Updating filteredHabits array

      // Updating localStorage with updated habits array
      localStorage.removeItem("habits");
      localStorage.setItem("habits", JSON.stringify(state.habits));
    },

    // Reducer to delete all habits
    deleteAllHabits: (state, action) => {
      state.habits = state.habits.splice(); // Clearing habits array
      state.filteredHabits = state.filteredHabits.splice(); // Clearing filteredHabits array
      localStorage.removeItem("habits"); // Removing habits data from localStorage
    },

    // Reducer to update today's status for a habit
    updateHabitTodayStatus: (state, action) => {
      // Updating today's status for the specified habit
      const habitsUpdated = state.habits.map((h) => {
        if (h.id === action.payload.id) {
          return {
            ...h,
            todayStatus: action.payload.todayStatus,
          };
        } else {
          return h; // Returning the original habit if it's not the one being updated
        }
      });

      // Updating state with updated habits array
      state.habits = [...habitsUpdated];

      // Updating localStorage with updated habits array
      localStorage.removeItem("habits");
      localStorage.setItem("habits", JSON.stringify(state.habits));
    },
  },
  
  extraReducers: (builder) => {},
});

// Exporting habit reducer, actions, and selector
export const habitReducer = habitSlice.reducer; // Habit reducer
export const habitAction = habitSlice.actions; // Habit actions
export const habitSelector = (state) => state.habitReducer; // Habit selector
