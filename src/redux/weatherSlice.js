import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'

// action

export const addToDashBoard = createAsyncThunk("addToDashBoard", async (data,rejectWithValue)=>{
    // console.log("redux thunk => ",data);

    const api = {
        base: "https://api.openweathermap.org/data/2.5/weather",
        key: process.env.REACT_APP_API_KEY,
    };

    try {
        const uri = `${api.base}?q=${data}&units=metric&appid=${api.key}`; // data = cityName
        const response = await fetch(uri);
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        return rejectWithValue(error);
    }
})

const initialState = {
    cities:[{
        id:Date.now(),
        location:null,
    }],
    weatherDetails:[{
        id:Date.now(),
        details:null,
    }],
    isLoading:false,
    isError:null
}

export const weatherSlice = createSlice({
    name:'weather',
    initialState,
    reducers:{
        deleteWeather:(state,action)=>{
            state.weatherDetails = state.weatherDetails.filter((weather)=>weather.id !== action.payload)
        },
        fetchWeather:(state,action)=>{
            const weatherData ={
                id:Date.now(),
                details:action.payload
            }
            state.weatherDetails.push(weatherData);
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addToDashBoard.pending,(state)=>{
            state.isLoading = true;
        });
        builder.addCase(addToDashBoard.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.weatherDetails.push(action.payload);
        });
        builder.addCase(addToDashBoard.rejected,(state,action)=>{
            state.isError = true;
            console.log("Error",action.payload);
        });
    }
})

export const { deleteWeather,fetchWeather } = weatherSlice.actions

export default weatherSlice.reducer