import "./App.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCity } from "./redux/weatherSlice";
import ShowDetails from "./components/ShowDetails";


function App() {
  const api = {
    base: "https://api.openweathermap.org/data/2.5/weather",
    key: process.env.REACT_APP_API_KEY,
  };

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [isBlank, setIsBlank] = useState(false);
  const dispatch = useDispatch();
  const cityData = useSelector((state) => state.cities);

  async function fetchData() {
    const uri = `${api.base}?q=${city}&units=metric&appid=${api.key}`;
    const response = await fetch(uri);
    const data = await response.json();
    setIsFetched(true);
    if (data.name && city) {
      setWeather(data);
      setIsBlank(false);
    } else {
      setWeather({});
      setIsBlank(true);
    }
  }

  function addCityToDashboard() {
    if (!city) {
      setIsFetched(true);
      setIsBlank(true);
    } else {
      dispatch(addCity(city));
      setIsBlank(false);
    }
  }

  function showErrorMessage() {
    const item = document.querySelector("#errorNotification");
    item.classList.remove("hideErrorMessage");
    setTimeout(() => {
      item.classList.add("hideErrorMessage");
    }, 1200);
  }

  return (
    <>
      <div id="errorNotification" className="hideErrorMessage errorMessage">
        {" "}
        <p>Please enter correct city/town name</p>{" "}
      </div>
      <div className="container">
        <div className="weatherBox">
          <div className="backgroundImage"></div>
          <h1 className="heading">Weather App</h1>
          <div className="inputArea">
            <label htmlFor="city">City Name : </label>
            <input
              className="inputBox"
              id="city"
              placeholder="e.g. Ballia"
              onChange={(e) => setCity(e.target.value)}
            ></input>
            <button className="btn" onClick={fetchData}>
              Search
            </button>
            <button className="addButton" onClick={addCityToDashboard}>
              +
            </button>
          </div>

          {Object.keys(weather).length > 0 ||
          Object.keys(cityData).length > 0 ? (
            <>
              {isFetched && weather.name ? (
                <ShowDetails key={weather.id} {...weather} />
              ) : isBlank && isFetched ? (
                <> {showErrorMessage()} </>
              ) : null}
              {cityData.map((location) => {
                return <ShowDetails key={location.id} {...location} />;
              })}

              {isBlank && isFetched ? <> {showErrorMessage()} </> : null}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
