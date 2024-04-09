import './App.css';
import React,{ useState } from 'react'

function App() {

  const api = {
    base:"https://api.openweathermap.org/data/2.5/weather",
    key:"d37576e1cd5f576717bdeb2b436f21bf"
  }

  const [city,setCity] = useState("");
  const [weather,setWeather] = useState({});
    
    function fetchData(){
      const uri = `${api.base}?q=${city}&units=metric&appid=${api.key}`;
      fetch(uri)
      .then((response)=>{
        response.json();
      })
      .then((data)=>{
        setWeather(data);
        console.log(data);
      })
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
{/* 
            <div>
              <p> { weather===undefined ? '' : weather.name} </p>
              <p> { weather===undefined ? '' : weather.main.temp+" ℃"} </p>
              <p> { weather===undefined ? '' : weather.weather[0].main} </p>
            </div> */}
          </div>
      </div>
    </>
  );
}

export default App

