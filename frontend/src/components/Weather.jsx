import React, { useState, useEffect } from "react";
import axios from 'axios';
import searchIcon from '../assets/search.svg';

const Weather = () => {
    const [location, setLocation] = useState('Ranchi');
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [forcast, setForcast] = useState(null)
    const accessKey = import.meta.env.VITE_REACT_APP_WEATHER_API;



    useEffect(() => {
        fetchData();
    }, []); // Added dependency array to prevent infinite loop

    async function fetchData() {
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${accessKey}`)
            .then(async response => {
                const { lat, lon } = response.data.coord; // Get latitude and longitude
                setWeatherData(response.data);
                const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${accessKey}`);
                setForcast(forecastResponse.data)

                // console.log('forcast is img nu ', forcast.list[0].weather[0].icon)




            })
            .catch(error => setError('Failed to fetch weather data'));

    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (!location) {
            setError('Please first enter a location');
            return;
        }

        fetchData();
        setLocation('');
    };

    const handleChange = (e) => {
        setLocation(e.target.value);
        setError(null);
    };

    const handleDay = (d) => {
        const date = new Date(d);
        const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        return days[date.getDay()]

    }

    const handleTime = (t) => {
        const date = new Date(t);
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Pad minutes with leading zero if needed
        const ampm = hours >= 12 ? 'PM' : 'AM';
        return `${hours}:${minutes} ${ampm}`

    }

    const  fiveDays = []
    const daysforecast =  () => {
        if (forcast) {

            for (let i = 0; i <= 39; i += 8) {
                fiveDays.push(forcast.list[i])
            }
        }
    }
    daysforecast()

    const handelCel=(temp)=>{
        return (temp - 273.15).toFixed(2);
    }



    return (
        <>

            <div className="text-black">
                <main className="flex-1  p-6">
                    <div className="flex justify-center items-center mb-6">
                        <input onChange={handleChange} value={location} type="text" placeholder="Search for cities" className="bg-gray-700 p-2 rounded w-1/3 text-gray-300  " />
                        <img onClick={handleSearch} className="bg-slate-600 rounded-md ml-1 hover:bg-white " src={searchIcon} alt="Search icon" />
                    </div>
                    {error && <div className="error text-red-600 flex items-center font-bold justify-center">{error}</div>}
                    {forcast && (
                        <div className=" mx-auto flex gap-3 ">
                            <div className="w-2/3 ">
                                <div className="mb-6">
                                    <h1 className="text-4xl font-bold">{weatherData.name}</h1>
                                    <p className="text-black-400">Chance of rain: {weatherData.weather[0].description}</p>
                                    <div className="flex items-center mt-4">
                                        <span className="text-6xl font-bold">{handelCel(weatherData.main.temp)}°C</span>
                                        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather icon" className="ml-4" />
                                    </div>
                                </div>
                                
                                <div className=" shadow-current shadow-lg p-4 rounded mb-6">
                                    <h2 className="text-2xl font-extrabold mb-4">Today's Forecast</h2>
                                    <div className="flex justify-between">

                                        <div className="text-center flex">
                                            {
                                                forcast.list.slice(0, 7).map((item, index) => {

                                                    return (
                                                        <div key={index}>

                                                            <p>{handleTime(item.dt_txt)}</p>
                                                            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="Weather icon" />
                                                            <p>{handelCel(item.main.temp)}°C</p>
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    </div>
                                </div>
                                <div className="shadow-current shadow-lg p-4 rounded">
                                    <h2 className="text-2xl font-extrabold mb-4">Air Conditions</h2>
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="flex items-center"><i className="fas fa-thermometer-half mr-2"></i> Real Feel</p>
                                            <p className="text-2xl">{weatherData.main.feels_like}°</p>
                                        </div>
                                        <div>
                                            <p className="flex items-center"><i className="fas fa-tint mr-2"></i> Chance of rain</p>
                                            <p className="text-2xl">{weatherData.weather[0].description}</p>
                                        </div>
                                        <div>
                                            <p className="flex items-center"><i className="fas fa-wind mr-2"></i> Wind</p>
                                            <p className="text-2xl">{weatherData.wind.speed} km/h</p>
                                        </div>
                                        <div>
                                            <p className="flex items-center"><i className="fas fa-sun mr-2"></i> UV Index</p>
                                            <p className="text-2xl">{weatherData.uvi}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mx-auto w-1/3 mt-4 shadow-current shadow-lg p-4 rounded">
                                <h2 className="text-lg mb-4 font-extrabold text-3xl">5-Day Forecast</h2>
                                <div className=" ">
                                
                                    
                                    {
                                        fiveDays && fiveDays.map((item,i)=>{
                                            return(
                                            <div key={i} className="flex justify-between items-center">
                                            <p>{handleDay(item.dt_txt)}</p>
                                            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="Weather icon" />
                                            <p>{item.weather[0].description}</p>
                                            <p>{handelCel(item.main.temp)}°C</p>
                                        </div>
                                        )})
                                    }
                                    {
                                        console.log('the five days is : ', fiveDays)
                                    }
                                </div>

                            </div>
                        </div>
                    )}
                </main>
            </div>

        </>
    );
};


export default Weather;



