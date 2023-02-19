import { createSlice } from '@reduxjs/toolkit'

export const loginUserSlice = createSlice({
  name: 'LoginUser',
  initialState: {
    value: null,
  },
  reducers: {
    LoginUser: (state,action) => {
        state.value=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { LoginUser } = loginUserSlice.actions

export default loginUserSlice.reducer