import { configureStore } from '@reduxjs/toolkit'
import  activeChatSlice  from './slices/ActiveChatSlice'
import loginUserSlice  from './slices/LoginUser'
import DarkMode from './slices/DarkMode'

export default configureStore({
  reducer: {
    activeChat:activeChatSlice,
    loginUser:loginUserSlice,
    darkMode:DarkMode
  },
})