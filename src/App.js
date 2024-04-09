import './App.css';
import React,{ useState } from 'react'

function App() {

  const api = {
    base:"https://api.openweathermap.org/data/2.5/weather",
    key:process.env.REACT_APP_API_KEY
  }

  const [city,setCity] = useState("");
  const [weather,setWeather] = useState({});
  const [isFetched,setIsFetched] = useState(false);

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
            </div>

            {
              Object.keys(weather).length>0
              ?
              <div>
                <p> { weather?.name} </p>
                <p> { weather?.main?.temp+" ℃"} </p>
                <p> { weather?.weather[0]?.main} </p>
              </div>
              :
              !weather.name && isFetched ? <p>Please enter correct city/town name</p> : null
            }

          </div>
      </div>
    </>
  );
}

export default App

