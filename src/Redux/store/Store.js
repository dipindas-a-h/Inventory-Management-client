import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducer/authReducer'

export default configureStore({
  reducer: {
    userDetails: authReducer,
    
  },
})