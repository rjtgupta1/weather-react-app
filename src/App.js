import './App.css';
import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCity } from './redux/weatherSlice'

function App() {

  const api = {
    base:"https://api.openweathermap.org/data/2.5/weather",
    key:process.env.REACT_APP_API_KEY
  }

  const [city,setCity] = useState("");
  const [weather,setWeather] = useState({});
  const [isFetched,setIsFetched] = useState(false);
  const dispatch = useDispatch();

    async function fetchData(){
      const uri = `${api.base}?q=${city}&units=metric&appid=${api.key}`;
      const response = await fetch(uri);
      const data = await response.json();
      setIsFetched(true);
      if(data.name && city){
        setWeather(data);
      }else{
        setWeather({});
      }
    }

    function addCityToDashboard(){
      dispatch(addCity(city))
    }


  return (
    <>
      <div className='container'>
          <div className='weatherBox'>
            <div className='backgroundImage'></div>
            <h1 className='heading'>Weather App</h1>
            <div className='inputArea'>
              <label htmlFor='city'>City Name : </label>
              <input className='inputBox' id='city' placeholder="e.g. Ballia" onChange={(e)=> setCity(e.target.value)}></input>
              <button className='btn' onClick={fetchData}>Search</button>
              <button className='addButton' onClick={addCityToDashboard}>+</button>
            </div>

            {
              Object.keys(weather).length>0
              ?
              <div className='weatherDetails'>
                <p> { weather?.name} </p>
                <p> { weather?.main?.temp+" ℃"} </p>
                <p> { weather?.weather[0]?.main} </p>
                <img alt='weatherImage' src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}.png`}></img>
              </div>
              :
              !weather.name && isFetched ? <div className='errorMessage'> <p>Please enter correct city/town name</p> </div> : null
            }

          </div>
      </div>
    </>
  );
}

export default App

