import { createSlice } from '@reduxjs/toolkit'

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    value: localStorage.getItem("darkMode")?JSON.parse(localStorage.getItem("darkMode")):null
    // value: null
  },
  reducers: {
    DarkMode: (state,action) => {
        state.value=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { DarkMode } = darkModeSlice.actions

export default darkModeSlice.reducer