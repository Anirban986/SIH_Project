import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search from '../../assets/search.png'
import clear from '../../assets/clear.png'
import cloud from '../../assets/cloud.png'
import drizzle from '../../assets/drizzle.png'
import Humidity from '../../assets/Humidity.svg'
import rain from '../../assets/rain.png'
import snow from '../../assets/snow.png'
import wind from '../../assets/wind.png'
import shower from '../../assets/shower.png'
import cloudynight from '../../assets/cloudynight.png'
import nightsnow from '../../assets/nightsnow.png'
import moon from '../../assets/moon.png'
import temp from '../../assets/temp.svg'
import pressure from '../../assets/pressure.svg'
import Wind from '../../assets/Wind.svg'
function Weather() {
    const [weatherdata, setweatherdata] = useState(false)
    const [forecast, setForecast] = useState([]) // 🌤️ forecast data
    const inputRef = useRef()

    const allIcons = {
        "snow": snow,
        "rain": rain,
        "cloudy": cloud,
        "wind": wind,
        "partly-cloudy-day": cloud,
        "partly-cloudy-night": cloudynight,
        "clear-day": clear,
        "clear-night": moon,
        "snow-showers-day": snow,
        "snow-showers-night": nightsnow,
        "showers-day": drizzle,
        "showers-night": shower
    }

    const fetchWeather = async (city) => {
        if (!city) {
            alert("Enter a city")
            return
        }
        try {
            const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=BCYN4FQE843WRH4Z47B8WWMSZ&contentType=json`
            const response = await fetch(url)
            const data = await response.json()
            console.log("Weather API response:", data)

            const icon = allIcons[data.currentConditions.icon] || clear

            setweatherdata({
                humidity: data.currentConditions.humidity,
                windSpeed: data.currentConditions.windspeed,
                temperature: Math.floor(data.currentConditions.temp),
                location: data.address,
                icon: icon,
                address: data.timezone,
                apparentTemp:data.currentConditions.feelslike ,
                pressure:data.currentConditions.pressure

            })

            // 🌤️ Save next 5 days forecast
            const forecastData = data.days.slice(1, 6).map(day => ({
                date: day.datetime,
                temp: Math.floor(day.temp),
                icon: allIcons[day.icon] || clear
            }))
            setForecast(forecastData)

        } catch (error) {
            console.error("Weather fetch failed:", error)
        }
    }

    const fetchLocationAndWeather = async () => {
        try {
            const locRes = await fetch("https://ipapi.co/json/")
            const locData = await locRes.json()
            console.log("IP API response:", locData)

            const city = locData.city
            if (city) {
                fetchWeather(city)
            } else {
                fetchWeather("London") // fallback
            }
        } catch (error) {
            console.error("IP location fetch failed:", error)
            fetchWeather("kolkata") // fallback
        }
    }

    useEffect(() => {
        fetchLocationAndWeather()
    }, [])

    return (
        <div className='weather'>
            <div className="search">
                <input ref={inputRef} type="text" placeholder='Search' />
                <img src={search} alt="search" onClick={() => fetchWeather(inputRef.current.value)} />
            </div>

            {weatherdata && (
                <>
                    <img src={weatherdata.icon} alt="" className='weather_icon' />
                    <p className='temperature'>{weatherdata.temperature}°C</p>
                    <p className='location'>{weatherdata.location}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={Humidity} alt="" />
                            <div className='text' >
                                <p>{weatherdata.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={Wind} alt="" />
                            <div className='text' >
                                <p>{weatherdata.windSpeed} km/hr</p>
                                <span>Wind speed</span>
                            </div>
                        </div>
                         <div className="col">
                            <img src={temp} alt="" />
                            <div className='text'>
                                <p>{weatherdata.apparentTemp}°C</p>
                                <span>Apparent Temparature</span>
                            </div>
                        </div>
                         <div className="col">
                            <img src={pressure} alt="" />
                            <div className='text' >
                                <p>{weatherdata.pressure}hPa</p>
                                <span>Air Pressure</span>
                            </div>
                        </div>
                    </div>

                    {/* 🌤️ Forecast Section */}
                    <div className="forecast">
                        <h3>5-Day Forecast</h3>
                        <div className="forecast-cards">
                            {forecast.map((day, index) => (
                                <div key={index} className="forecast-card">
                                    <p>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                                    <img src={day.icon} alt="" />
                                    <p>{day.temp}°C</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Weather
