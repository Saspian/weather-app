import { useEffect, useState } from "react";
import "./App.css";
import Backdrop from "@mui/material/Backdrop";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Chip from "@mui/material/Chip";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AirIcon from "@mui/icons-material/Air";
import TireRepairIcon from "@mui/icons-material/TireRepair";
import LightModeIcon from "@mui/icons-material/LightMode";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocationTracker from "./components/LocationTracker";
import { blue, red } from "@mui/material/colors";

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
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = days[date.getDay()];
    return dayOfWeek;
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  };
  const handleUnitChange = (event, unit) => {
    setTempUnit(unit);
  };
  const getUVIndexCategory = (uvIndex) => {
    if (uvIndex < 3) {
      return "Low";
    } else if (uvIndex < 6) {
      return "Moderate";
    } else if (uvIndex < 8) {
      return "High";
    } else if (uvIndex < 11) {
      return "Very High";
    } else {
      return "Extreme";
    }
  };
  const getAirQualityIndex = (index) => {
    const epaIndex = index["us-epa-index"];
    const usAIQIndex = {
      1: "Good",
      2: "Moderate",
      3: "Unhealthy for sensitive group",
      4: "Unhealthy",
      5: "Very Unhealthy",
      6: "Hazardous",
    };
    return usAIQIndex[epaIndex];
  };
  const roundOffHours = () => {
    const date = new Date();
    let hour = date.getHours();
    if (date.getMinutes() >= 30) {
      hour += 1;
    }
    const roundedHour = hour.toString().padStart(2, "0");
    return `${roundedHour}:00`;
  };
  const getCurrentDate = (data) => {
    const currentDate = new Date(data);
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  };
  const isToday = (data) => {
    const date = new Date(data);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  const isTomorrow = (data) => {
    const date = new Date(data);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear()
    );
  };

  return (
    <div>
      <LocationTracker setLocation={setLocation} />
      {location && Object.keys(weatherData).length ? (
        <div className="card-container">
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            {/* Temparature */}
            <Card className="col-span-2 custom-card" elevation={2}>
              <CardContent className="flex justify-between">
                <div>
                  <Chip
                    className="mb-6"
                    icon={<LocationOnIcon fontSize="small" />}
                    label={weatherData.location.name}
                    color="primary"
                  />
                  <div className="text-3xl font-bold">
                    {getDayOfWeek(weatherData.location.localtime)}
                  </div>
                  <div className="mb-3">
                    {formatDate(weatherData.location.localtime)}
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="body2" className="pr-4">
                      <span className="font-bold">High:</span>{" "}
                      {tempUnit === "F"
                        ? weatherData.forecast.forecastday[0].day.maxtemp_f +
                          "°F"
                        : weatherData.forecast.forecastday[0].day.maxtemp_c +
                          "°C"}
                    </Typography>
                    <Typography variant="body2">
                      <span className="font-bold">Low:</span>{" "}
                      {tempUnit === "F"
                        ? weatherData.forecast.forecastday[0].day.mintemp_f +
                          "°F"
                        : weatherData.forecast.forecastday[0].day.mintemp_c +
                          "°C"}
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <ToggleButtonGroup
                    value={tempUnit}
                    exclusive
                    onChange={handleUnitChange}
                    size="small"
                    color="primary"
                    sx={{
                      background: blue[500],
                      "&.Mui-active": {
                        background: red[500],
                      },
                      "&.Mui-selected": {
                        background: red[500],
                      },
                    }}
                  >
                    <ToggleButton
                      sx={{
                        paddingTop: 0,
                        paddingBottom: 0,
                      }}
                      value="F"
                      aria-label="Farenheit"
                    >
                      <span style={{ fontSize: "12px", color: "white" }}>
                        °F
                      </span>
                    </ToggleButton>
                    <ToggleButton
                      sx={{
                        paddingTop: 0,
                        paddingBottom: 0,
                      }}
                      value="C"
                      aria-label="Celsius"
                    >
                      <span style={{ fontSize: "12px", color: "white" }}>
                        °C
                      </span>
                    </ToggleButton>
                  </ToggleButtonGroup>

                  <div className="flex">
                    <div className="text-8xl font-extralight">
                      {Math.round(
                        tempUnit === "F"
                          ? weatherData.current.temp_f
                          : weatherData.current.temp_c
                      )}
                    </div>
                    <div className="mt-2 text-5xl">
                      {tempUnit === "F" ? "°F" : "°C"}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center">
                      <img
                        src={weatherData.current.condition.icon}
                        alt="weather icon"
                        width={30}
                        className="mr-2"
                      />
                      <Typography
                        variant="body2"
                        className="capitalize text-left"
                        color="white"
                      >
                        {weatherData.current.condition.text}
                      </Typography>
                    </div>
                    <Typography variant="body2">
                      Feels like{" "}
                      {tempUnit === "F"
                        ? weatherData.current.temp_f + "°F"
                        : weatherData.current.feelslike_c + "°C"}
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Wind Status */}
            <Card className="custom-card" elevation={2}>
              <CardContent className="flex flex-col justify-between h-full">
                <div
                  className="flex items-center"
                  color="white"
                  display="block"
                >
                  <AirIcon fontSize="small" className="mr-2" />
                  <div className="font-bold">Wind Status</div>
                </div>
                <div className="flex items-center flex-wrap">
                  <div className="text-4xl font-bold mr-2">
                    {weatherData.current.wind_kph}
                  </div>
                  <div className="text-xl">km/h</div>
                </div>
                <div>
                  <Typography variant="body2" color="white">
                    <span className="font-bold">Wind Direction:</span>{" "}
                    {weatherData.current.wind_dir}
                  </Typography>
                  <Typography variant="body2" color="white">
                    <span className="font-bold">Wind Degree:</span>{" "}
                    {weatherData.current.wind_degree}°
                  </Typography>
                </div>
              </CardContent>
            </Card>
            {/* Pressure */}
            <Card className="custom-card" elevation={2}>
              <CardContent className="flex flex-col justify-between h-full">
                <div
                  className="flex items-center"
                  color="white"
                  display="block"
                >
                  <TireRepairIcon fontSize="small" className="mr-2" />
                  <div className="font-bold">Pressure</div>
                </div>
                <div className="flex items-center flex-wrap">
                  <div className="text-4xl font-bold mr-2">
                    {weatherData.current.pressure_mb}
                  </div>
                  <div className="text-xl">millibars</div>
                </div>
                <div></div>
              </CardContent>
            </Card>
          </div>
          <div className="grid md:grid-cols-4 sm:grid-cols-3 gap-4 mb-4">
            {/* UV */}
            <Card className="custom-card" elevation={2}>
              <CardContent className="flex flex-col justify-between h-full">
                <div
                  className="flex items-center mb-4"
                  color="white"
                  display="block"
                >
                  <LightModeIcon fontSize="small" className="mr-2" />
                  <div className="font-bold">UV Index</div>
                </div>
                <div className="flex items-center">
                  <div className="text-4xl font-bold mr-2">
                    {weatherData.current.uv}
                  </div>
                </div>
                <div>
                  <Typography variant="body2" color="white">
                    <span className="font-bold">
                      {getUVIndexCategory(weatherData.current.uv)}
                    </span>
                  </Typography>
                </div>
              </CardContent>
            </Card>
            {/* Humidity */}
            <Card className="custom-card" elevation={2}>
              <CardContent className="flex flex-col justify-between h-full">
                <div
                  className="flex items-center mb-4"
                  color="white"
                  display="block"
                >
                  <AirIcon fontSize="small" className="mr-2" />
                  <div className="font-bold">Humidity</div>
                </div>
                <div className="flex items-center">
                  <div className="text-4xl font-bold mr-2">
                    {weatherData.current.humidity}
                  </div>
                  <div className="text-xl">%</div>
                </div>
                <div></div>
              </CardContent>
            </Card>
            {/* Precipitation */}
            <Card className="custom-card" elevation={2}>
              <CardContent className="flex flex-col justify-between h-full">
                <div
                  className="flex items-center mb-4"
                  color="white"
                  display="block"
                >
                  <WaterDropIcon fontSize="small" className="mr-2" />
                  <div className="font-bold">Precipitation</div>
                </div>
                <div className="flex items-center">
                  <div className="text-4xl font-bold mr-2">
                    {weatherData.current.precip_mm}
                  </div>
                  <div className="text-xl">mm</div>
                </div>
                <div>
                  <Typography variant="body2" color="white">
                    <span className="font-bold">in last 24hr</span>{" "}
                  </Typography>
                </div>
              </CardContent>
            </Card>
            {/* Visibilty */}
            <Card className="custom-card" elevation={2}>
              <CardContent className="flex flex-col justify-between h-full">
                <div
                  className="flex items-center mb-4"
                  color="white"
                  display="block"
                >
                  <VisibilityIcon fontSize="small" className="mr-2" />
                  <div className="font-bold">Visibilty</div>
                </div>
                <div className="flex items-center">
                  <div className="text-4xl font-bold mr-2">
                    {weatherData.current.vis_km}
                  </div>
                  <div className="text-xl">km</div>
                </div>
                <div></div>
              </CardContent>
            </Card>
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
            <div>
              <Typography variant="h5" color="white" className="pb-2">
                <span className="font-bold">Tomorrow</span>
              </Typography>
              <Card className="custom-card sm:min-w-0 min-w-56" elevation={2}>
                <CardContent className="flex flex-col justify-between h-full">
                  <Typography className="pb-4" variant="body2" color="white">
                    <div className="flex items-center">
                      <img
                        src={
                          weatherData.forecast.forecastday[0].day.condition.icon
                        }
                        alt="weather icon"
                        width={30}
                        className="mr-2"
                      />
                      <span>
                        {weatherData.forecast.forecastday[0].day.condition.text}
                      </span>
                    </div>
                  </Typography>
                  <div
                    className="flex items-center"
                    color="white"
                    display="block"
                  >
                    <div className="font-bold">Sunrise</div>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="md:text-4xl font-bold mr-2">
                      {weatherData.forecast.forecastday[0].astro.sunrise}
                    </div>
                  </div>
                  <div
                    className="flex items-center"
                    color="white"
                    display="block"
                  >
                    <div className="font-bold">Sunset</div>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="md:text-4xl font-bold mr-2">
                      {weatherData.forecast.forecastday[0].astro.sunset}
                    </div>
                  </div>
                  <div>
                    <Typography variant="body2" color="white">
                      <span className="font-bold">Moonrise:</span>{" "}
                      {weatherData.forecast.forecastday[0].astro.moonrise}
                    </Typography>
                    <Typography variant="body2" color="white">
                      <span className="font-bold">Moonset:</span>{" "}
                      {weatherData.forecast.forecastday[0].astro.moonset}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Hourly Forescast */}
            <div className="col-span-5 overflow-x-auto">
              <Typography variant="h5" color="white">
                <span className="font-bold">Hourly Forecast</span>
              </Typography>
              <div className="col-span-5 overflow-x-auto">
                <div className="flex gap-4 overflow-auto w-fit md:mt-2 mt-5">
                  {weatherData.forecast.forecastday[0].hour.map(
                    (data, index) => (
                      <Card
                        key={index}
                        className="hourly-card h-72"
                        elevation={2}
                      >
                        <CardContent className="flex flex-col justify-between items-center h-full">
                          <div
                            className="flex items-center"
                            color="white"
                            display="block"
                          >
                            <div className="font-bold">
                              {roundOffHours() == data.time.split(" ")[1]
                                ? "NOW"
                                : data.time.split(" ")[1]}
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <img
                              src={data.condition.icon.replace(
                                "64x64",
                                "128x128"
                              )}
                              alt={data.condition.text}
                              width={40}
                            />
                            <Typography
                              className="text-center"
                              variant="body2"
                              color="white"
                            >
                              {data.condition.text}
                            </Typography>
                          </div>
                          <div
                            className="flex items-center"
                            color="white"
                            display="block"
                          >
                            <div className="font-bold">
                              {tempUnit === "F"
                                ? Math.round(data.temp_f) + " °F"
                                : Math.round(data.temp_c) + " °C"}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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
                    <Card key={index} className="daily-card h-56" elevation={2}>
                      <CardContent className="flex flex-col justify-between items-center h-full">
                        <div
                          className="flex flex-col items-center"
                          color="white"
                          display="block"
                        >
                          <div className="font-bold">
                            {isToday(data.date)
                              ? "Today"
                              : isTomorrow(data.date)
                              ? "Tomorrow"
                              : getDayOfWeek(data.date)}
                          </div>
                          <div className="font-bold text-sm">
                            {getCurrentDate(data.date)}
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <img
                            src={data.day.condition.icon.replace(
                              "64x64",
                              "128x128"
                            )}
                            alt={data.day.condition.text}
                            width={40}
                          />
                          <Typography
                            className="text-center"
                            variant="body2"
                            color="white"
                          >
                            {data.day.condition.text}
                          </Typography>
                        </div>
                        <div
                          className="flex items-center text-sm"
                          color="white"
                          display="block"
                        >
                          <div className="font-bold">
                            {tempUnit === "F"
                              ? Math.round(data.day.mintemp_f) + " °F"
                              : Math.round(data.day.mintemp_c) + " °C"}{" "}
                            /{" "}
                            {tempUnit === "F"
                              ? Math.round(data.day.maxtemp_f) + " °F"
                              : Math.round(data.day.maxtemp_c) + " °C"}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
