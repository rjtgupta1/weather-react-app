import React from 'react'
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useState } from 'react';

const api = {
    base:"https://api.openweathermap.org/data/2.5/weather",
    key:process.env.REACT_APP_API_KEY
}


const FetchWeather = () => {
    const [cities,setCities] = useState(null)
    const citiesName = useSelector(state => state.cities);
    setCities(citiesName)
  return (
    <div>
      
    </div>
  )
}

export const fetchWeatherData = FetchWeather


const city = "Ballia"

const uri = `${api.base}?q=${city}&units=metric&appid=${api.key}`;

console.log(uri)

export const fetchWeather = createAsyncThunk("fetchWeather",async ()=>{
    const response = await fetch(uri);
    return response.json();
})

const fetchWeatherSlice = createSlice({
    name:"fetchWeather",
    initialState:{
        isLoading:false,
        data:null,
        isError:false
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchWeather.pending,(state,action)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchWeather.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchWeather.rejected,(state,action)=>{
            state.isError = true;
            console.log("Error",action.payload)
        });
    }
})


export default fetchWeatherSlice.reducer