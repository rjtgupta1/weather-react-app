import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cities:[{}]
}

export const citySlice = createSlice({
    name:'weather',
    initialState,
    reducers:{
        addCity:(state,action)=>{
            const city ={
                id:Date.now(),
                text:action.payload
            }
            state.cities.push(city)
        },
        removeCity:(state,action)=>{
            state.cities = state.cities.filter((city)=> city.id !== action.payload )
        }
    }
})

export const { addCity,removeCity } = citySlice.actions

export default citySlice.reducer