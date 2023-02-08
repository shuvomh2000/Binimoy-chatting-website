import { configureStore } from '@reduxjs/toolkit'
import  activeChatSlice  from './slices/ActiveChatSlice'

export default configureStore({
  reducer: {
    activeChat:activeChatSlice
  },
})