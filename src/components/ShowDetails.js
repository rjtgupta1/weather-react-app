import React from 'react'

const ShowDetails = (location) => {
    console.log(location)
  return (
    location.location || location.name
    ?
    <div className="weatherDetails">
      <p> {location.location || location.name} </p>
      <p> {location?.main ? location.main.temp + " ℃" : "32 "+ " ℃"} </p>
      <p> {location?.weather ? location.weather[0].main : "Haze" } </p>
      {
        location?.weather
        ?
        <img
        alt={location.weather[0].description}
        src={`https://openweathermap.org/img/wn/${location?.weather[0]?.icon}.png`}
      ></img>
      : 
      <img
        alt="weatherIcon"
        src=''
      ></img>
      }
    </div>
    :
    null
  )
}

export default ShowDetails
