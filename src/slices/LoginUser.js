import { createSlice } from '@reduxjs/toolkit'

export const loginUserSlice = createSlice({
  name: 'LoginUser',
  initialState: {
    value: localStorage.getItem("loginInfo")?JSON.parse(localStorage.getItem("loginInfo")):null
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