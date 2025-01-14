import { useEffect, useState } from "react";
import Search from "./search";


function WeatherApp() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  console.log("API Key:", import.meta.env.REACT_APP_API_KEY);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${import.meta.env.VITE_APP_API_KEY}`
      );

      const data = await response.json();
      if (data) {
        setLoading(false);
        setWeatherData(data);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  function handleSearch() {
    fetchWeatherData(search);
  }

  function getCurrentDate(){
    return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
  }

  useEffect(() => {
    fetchWeatherData("Bangalore");
  }, [])

  console.log(weatherData);

  return (
    <div className="card">
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {
        loading ? <div className="loading">Loading...</div> : 
        <div>
            <h2 className="content">{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>
            <div>
                <span className="date">
                    {getCurrentDate()}
                </span>
            </div>
            <div className="temp">
                {weatherData?.main?.temp}
            </div>
            <p className="description">{weatherData?.weather[0]?.description}</p>
        </div>
      }
    </div>
  );
}

export default WeatherApp;
