'use client';
import axios from "axios";
import { useState } from "react";

interface WeatherData{
    "weather": 
    [
      {
        "description":string,
        "icon":string
      }
    ];
    "main": {
        "temp": number,
        "temp_min": number,
        "temp_max": number,
    };
}

const MainPage =()=> {
    const [city, setCity] = useState('seoul');
  
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const getWeather =async()=>{
      try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric&lang=kr`);
        console.log(response.data);
        setWeatherData(response.data);
  
      }catch(error){ 
        console.log('error:',error);
      }
   
    }

    return (
    <div className=" grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
    <main className="flex flex-col gap-8 row-start-2 items-center ">
      <div className="bg-white py-9 px-7 rounded-3xl max-w-80 sm:min-h-96  flex flex-col items-center justify-center">
        <h3 className="font-mono font-bold text-lg text-center">Let's take a Today <span className="bg-yellow-100">{city}</span>'s Weather..🌈</h3>
        <div className="min-h-[200px] flex flex-col items-center justify-center">
          {weatherData ? (
            <div className="font-mono">
              <p>Weather : {weatherData.weather[0].description}</p>
              <p>Temp : {weatherData.main.temp}</p>
              <p>high : {weatherData.main.temp_max}</p>
              <p>low : {weatherData.main.temp_min}</p>
            </div>
          ) : (
            <p className=" bg-slate-100 rounded-sm p-3 font-mono text-center"> Oops! We don't have any data 💦</p>
          ) }
          </div>
        <input
          className="border hover:border-2 border-slate-300 hover:border-slate-500 transition ease-in-out rounded-md p-3"
          type="text"
          placeholder="지역명 입력"
          value={city}
          onChange={((e)=> setCity(e.target.value))}
        />
        <button className="mt-3 p-2 rounded-md font-semibold text-white bg-green-500 hover:bg-green-600 transition ease-in-out " onClick={getWeather}>날씨 가져오기</button>
      </div>
    </main>
  </div>
  );
}

export default MainPage;