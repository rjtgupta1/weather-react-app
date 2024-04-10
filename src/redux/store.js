import { configureStore } from '@reduxjs/toolkit'
import cityReducer from '../redux/weatherSlice'

export const store = configureStore({
    reducer: cityReducer
})