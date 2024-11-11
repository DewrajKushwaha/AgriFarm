import React, { useState, useEffect } from "react";
import axois from 'axios'

import searchIcon from '../assets/search.svg';

const Weather = () => {
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
           
        fetchData()
     
    })
    async function fetchData() {
       await axois.get("https://api.openweathermap.org/data/2.5/weather?q=Ranchi&appid=0667c19baaa06cea1d51ab6a4c9ac2bc")
            .then(response=>{
                setWeatherData(response.data)})
            .catch(error => setError('Failed to fetch weather data'));
          
      }  

    const onSubmit = (e) => {
        e.preventDefault();
        if (!location) {
            setError('Please enter a location');
            return;
        }
       
        console.log("Location is ", location);
        setLocation('');
        setError(null);
    };

    const handleChange = (e) => {
        setLocation(e.target.value);
        setError(null);
    };

    return (
        <>

            <div className="flex text-white relative top-0 z-0 h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">

                <main className="flex-1 p-6">
                    <div className="flex justify-center items-center mb-6">
                        <input onChange={handleChange} value={location} type="text" placeholder="Search for cities" className="bg-gray-700 p-2 rounded w-1/3 text-gray-300  " />
                        <img onClick={onSubmit} className="bg-slate-600 rounded-md ml-1 hover:bg-white " src={searchIcon} alt="Search icon" />
                    </div>
                    {error && <div className="error">{error}</div>}
                    {weatherData && (
                        <div className="flex justify-between">
                            <div className="w-2/3">
                                <div className="mb-6">
                                    <h1 className="text-4xl font-bold">{weatherData.name}</h1>
                                    <p className="text-gray-400">Chance of rain: {weatherData.weather[0].description}</p>
                                    <div className="flex items-center mt-4">
                                        <span className="text-6xl font-bold">{weatherData.main.temp}°</span>
                                        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather icon" className="ml-4" />
                                    </div>
                                </div>
                                <div className="bg-gray-900 p-4 rounded mb-6">
                                    <h2 className="text-lg mb-4">Today's Forecast</h2>
                                    <div className="flex justify-between">
                                        <div className="text-center">
                                            <p>6:00 AM</p>
                                            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather icon" />
                                            <p>{weatherData.main.temp}°</p>
                                        </div>
                                        <div className="text-center">
                                            <p>9:00 AM</p>
                                            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather icon" />
                                            <p>{weatherData.main.temp}°</p>
                                        </div>
                                        <div className="text-center">
                                            <p>12:00 PM</p>
                                            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather icon" />
                                            <p>{weatherData.main.temp}°</p>
                                        </div>
                                        <div className="text-center">
                                            <p>3:00 PM</p>
                                            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather icon" />
                                            <p>{weatherData.main.temp}°</p>
                                        </div>
                                        <div className="text-center">
                                            <p>6:00 PM</p>
                                            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather icon" />
                                            <p>{weatherData.main.temp}°</p>
                                        </div>
                                        <div className="text-center">
                                            <p>9:00 PM</p>
                                            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather icon" />
                                            <p>{weatherData.main.temp}°</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-900 p-4 rounded">
                                    <h2 className="text-lg mb-4">Air Conditions</h2>
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
                            <div className="w-1/3 bg-gray-900 p-4 rounded">
                                <h2 className="text-lg mb-4">7-Day Forecast</h2>
                                <div className="space-y-4">
                                    {weatherData.forecast && weatherData.forecast.list.map((day, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <p>{day.dt_txt}</p>
                                            <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="Weather icon" />
                                            <p>{day.weather[0].description}</p>
                                            <p>{day.main.temp}°</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

        </>
    );
};

// export default Weather;
//         console.log("Location is ", location);
//         setLocation('');
//         setError(null);
//     };

//     const handleChange = (e) => {
//         setLocation(e.target.value);
//         setError(null);
//     };

//     return (
//         <>

//             <div className="flex text-white relative top-0 z-0 h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">

//                 <main className="flex-1 p-6">
//                     <div className="flex justify-center items-center mb-6">
//                         <input onChange={handleChange} value={location} type="text" placeholder="Search for cities" className="bg-gray-700 p-2 rounded w-1/3 text-gray-300  " />
//                         <img onClick={onSubmit} className="bg-slate-600 rounded-md ml-1 hover:bg-white " src={searchIcon} alt="Search icon" />
//                     </div>
//                     <div className="flex justify-between">
//                         <div className="w-2/3">
//                             <div className="mb-6">
//                                 <h1 className="text-4xl font-bold">Madrid</h1>
//                                 <p className="text-gray-400">Chance of rain: 0%</p>
//                                 <div className="flex items-center mt-4">
//                                     <span className="text-6xl font-bold">31°</span>
//                                     <img src='../assets/sun.svg' alt="Sunny icon" className="ml-4" />
                                    
//                                 </div>
//                             </div>
//                             <div className="bg-gray-900 p-4 rounded mb-6">
//                                 <h2 className="text-lg mb-4">Today's Forecast</h2>
//                                 <div className="flex justify-between">
//                                     <div className="text-center">
//                                         <p>6:00 AM</p>
//                                         <img src="https://placehold.co/50x50" alt="Cloudy icon" />
//                                         <p>25°</p>
//                                     </div>
//                                     <div className="text-center">
//                                         <p>9:00 AM</p>
//                                         <img src="https://placehold.co/50x50" alt="Partly cloudy icon" />
//                                         <p>28°</p>
//                                     </div>
//                                     <div className="text-center">
//                                         <p>12:00 PM</p>
//                                         <img src="https://placehold.co/50x50" alt="Sunny icon" />
//                                         <p>33°</p>
//                                     </div>
//                                     <div className="text-center">
//                                         <p>3:00 PM</p>
//                                         <img src="https://placehold.co/50x50" alt="Sunny icon" />
//                                         <p>34°</p>
//                                     </div>
//                                     <div className="text-center">
//                                         <p>6:00 PM</p>
//                                         <img src="https://placehold.co/50x50" alt="Sunny icon" />
//                                         <p>32°</p>
//                                     </div>
//                                     <div className="text-center">
//                                         <p>9:00 PM</p>
//                                         <img src="https://placehold.co/50x50" alt="Cloudy icon" />
//                                         <p>30°</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="bg-gray-900 p-4 rounded">
//                                 <h2 className="text-lg mb-4">Air Conditions</h2>
//                                 <div className="flex justify-between">
//                                     <div>
//                                         <p className="flex items-center"><i className="fas fa-thermometer-half mr-2"></i> Real Feel</p>
//                                         <p className="text-2xl">30°</p>
//                                     </div>
//                                     <div>
//                                         <p className="flex items-center"><i className="fas fa-tint mr-2"></i> Chance of rain</p>
//                                         <p className="text-2xl">0%</p>
//                                     </div>
//                                     <div>
//                                         <p className="flex items-center"><i className="fas fa-wind mr-2"></i> Wind</p>
//                                         <p className="text-2xl">0.2 km/h</p>
//                                     </div>
//                                     <div>
//                                         <p className="flex items-center"><i className="fas fa-sun mr-2"></i> UV Index</p>
//                                         <p className="text-2xl">3</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="w-1/3 bg-gray-900 p-4 rounded">
//                             <h2 className="text-lg mb-4">7-Day Forecast</h2>
//                             <div className="space-y-4">
//                                 <div className="flex justify-between items-center">
//                                     <p>Today</p>
//                                     <img src="https://placehold.co/30x30" alt="Sunny icon" />
//                                     <p>Sunny</p>
//                                     <p>36/22</p>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <p>Tue</p>
//                                     <img src="https://placehold.co/30x30" alt="Sunny icon" />
//                                     <p>Sunny</p>
//                                     <p>37/21</p>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <p>Wed</p>
//                                     <img src="https://placehold.co/30x30" alt="Sunny icon" />
//                                     <p>Sunny</p>
//                                     <p>37/21</p>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <p>Thu</p>
//                                     <img src="https://placehold.co/30x30" alt="Cloudy icon" />
//                                     <p>Cloudy</p>
//                                     <p>37/21</p>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <p>Fri</p>
//                                     <img src="https://placehold.co/30x30" alt="Cloudy icon" />
//                                     <p>Cloudy</p>
//                                     <p>37/21</p>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <p>Sat</p>
//                                     <img src="https://placehold.co/30x30" alt="Rainy icon" />
//                                     <p>Rainy</p>
//                                     <p>37/21</p>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <p>Sun</p>
//                                     <img src="https://placehold.co/30x30" alt="Storm icon" />
//                                     <p>Storm</p>
//                                     <p>37/21</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </main>
//             </div>

//         </>
//     );
// };

export default Weather;



