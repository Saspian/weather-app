import { useEffect, useState } from "react";
import "./App.css";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import AirIcon from "@mui/icons-material/Air";
import TireRepairIcon from "@mui/icons-material/TireRepair";
import LightModeIcon from "@mui/icons-material/LightMode";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocationTracker from "./components/LocationTracker";
import CommonBox from "./components/CommonBox";
import {
  getDayOfWeek,
  getUVIndexCategory,
  getAirQualityIndex,
  roundOffHours,
  getCurrentDate,
  isToday,
  isTomorrow,
  getHighLowTemp,
} from "./utils";
import TomorrowBox from "./components/TomorrowBox";
import ForecastBox from "./components/ForecastBox";
import MainBox from "./components/MainBox";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tempUnit, setTempUnit] = useState("C");

  useEffect(() => {
    getWeatherInfo();
  }, [location]);

  const getWeatherInfo = () => {
    if (location) {
      fetch(
        `${import.meta.env.VITE_WEATHER_API}?key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=${location.latitude},${
          location.longitude
        }&days=10&aqi=yes&alerts=yes`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
          mode: "cors",
        }
      )
        .then(async (response) => {
          const res = await response.json();
          setWeatherData(res);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const handleUnitChange = (event, unit) => {
    setTempUnit(unit);
  };

  return (
    <div>
      <LocationTracker setLocation={setLocation} />
      {location && Object.keys(weatherData).length ? (
        <div className="card-container">
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            {/* Temparature */}
            <MainBox
              data={weatherData}
              tempUnit={tempUnit}
              handleUnitChange={handleUnitChange}
            />
            {/* Wind Status */}
            <CommonBox
              icon={<AirIcon fontSize="small" className="mr-2" />}
              title="Wind Status"
              data1={weatherData.current.wind_kph}
              unit1="km/h"
              subtitle1="Wind Direction:"
              subData1={weatherData.current.wind_dir}
              subDataUnit1=""
              subData2={weatherData.current.wind_degree}
              subDataUnit2="°"
              subtitle2="Wind Degree:"
            />
            {/* Pressure */}
            <CommonBox
              icon={<TireRepairIcon fontSize="small" className="mr-2" />}
              title="Pressure"
              data1={weatherData.current.pressure_mb}
              unit1="millibars"
            />
          </div>
          <div className="grid md:grid-cols-4 sm:grid-cols-3 gap-4 mb-4">
            {/* UV */}
            <CommonBox
              icon={<LightModeIcon fontSize="small" className="mr-2" />}
              title="UV Index"
              data1={weatherData.current.uv}
              subtitle1={getUVIndexCategory(weatherData.current.uv)}
            />
            {/* Humidity */}
            <CommonBox
              icon={<AirIcon fontSize="small" className="mr-2" />}
              title="Humidity"
              data1={weatherData.current.humidity}
              unit1="%"
            />
            {/* Precipitation */}
            <CommonBox
              icon={<WaterDropIcon fontSize="small" className="mr-2" />}
              title="Precipitation"
              data1={weatherData.current.precip_mm}
              unit1="mm"
              subData1="in last 24hr"
            />
            {/* Visibilty */}
            <CommonBox
              icon={<VisibilityIcon fontSize="small" className="mr-2" />}
              title="Visibilty"
              data1={weatherData.current.vis_km}
              unit1="km"
            />
            {/* Visibilty */}
          </div>
          <div className="grid grid-cols gap-4 mb-4 md:text-right">
            <Typography variant="subtitle1" color="white">
              Wind gusts are up to {weatherData.current.gust_mph} km/h. Air
              quality is {getAirQualityIndex(weatherData.current.air_quality)}.
            </Typography>
          </div>
          <div className="grid md:grid-cols-6 gap-4 mb-4">
            {/* Tomorrow */}
            <TomorrowBox data={weatherData.forecast.forecastday[0]} />
            {/* Hourly Forescast */}
            <div className="col-span-5 overflow-x-auto">
              <Typography variant="h5" color="white">
                <span className="font-bold">Hourly Forecast</span>
              </Typography>
              <div className="col-span-5 overflow-x-auto">
                <div className="flex gap-4 overflow-auto w-fit md:mt-2 mt-5">
                  {weatherData.forecast.forecastday[0].hour.map(
                    (data, index) => (
                      <ForecastBox
                        key={index}
                        header={
                          roundOffHours() == data.time.split(" ")[1]
                            ? "NOW"
                            : data.time.split(" ")[1]
                        }
                        weatherIcon={data.condition.icon.replace(
                          "64x64",
                          "128x128"
                        )}
                        weatherText={data.condition.text}
                        temp={
                          tempUnit === "F"
                            ? Math.round(data.temp_f) + " °F"
                            : Math.round(data.temp_c) + " °C"
                        }
                        customCss="hourly-card h-72"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols gap-4 mb-4">
            <div className="overflow-x-auto">
              <Typography variant="h5" color="white">
                <span className="font-bold">10 Days Weather Forecast</span>
              </Typography>
              <div className="overflow-x-auto">
                <div className="flex gap-4 overflow-auto w-fit md:mt-2 mt-5">
                  {weatherData.forecast.forecastday.map((data, index) => (
                    <ForecastBox
                      key={index}
                      header={
                        isToday(data.date)
                          ? "Today"
                          : isTomorrow(data.date)
                          ? "Tomorrow"
                          : getDayOfWeek(data.date)
                      }
                      subHeader={getCurrentDate(data.date)}
                      weatherIcon={data.day.condition.icon.replace(
                        "64x64",
                        "128x128"
                      )}
                      weatherText={data.day.condition.text}
                      temp={getHighLowTemp(data.day, tempUnit)}
                      customCss="daily-card h-56"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

export default App;
