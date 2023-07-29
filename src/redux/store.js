import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './blogSlice'

export const store = configureStore({
  reducer: {
    blogs: blogsReducer,
  },
})