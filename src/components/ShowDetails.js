import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteWeather } from '../redux/weatherSlice';

const ShowDetails = (location) => {
  const dispatch = useDispatch();

  function removeWeather(city){
    // console.log("deleting...")
    // console.log(city.id)
    dispatch(deleteWeather(city.id));
  }

    const {isAdded} = location;
    // console.log(location,isAdded)
  return (
    location.name
    ?
    <div className="weatherDetails">
      <p> {location.location || location.name} </p>
      <p> {location?.main ? location.main.temp + " ℃" : "32 "+ " ℃"} </p>
      <p> {location?.weather ? location.weather[0].main : "Haze" } </p>
        <img
        alt={location.weather[0].description}
        src={`https://openweathermap.org/img/wn/${location?.weather[0]?.icon}.png`}
      ></img>
     { isAdded ? <p className='delete' onClick={ ()=> removeWeather(location) }>X</p> : null}
    </div>
    :
    null
  )
}

export default ShowDetails
