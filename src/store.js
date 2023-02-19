import { configureStore } from '@reduxjs/toolkit'
import  activeChatSlice  from './slices/ActiveChatSlice'
import loginUserSlice  from './slices/LoginUser'

export default configureStore({
  reducer: {
    activeChat:activeChatSlice,
    loginUser:loginUserSlice
  },
})