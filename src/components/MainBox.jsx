import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Chip from "@mui/material/Chip";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { blue, red } from "@mui/material/colors";
import { getDayOfWeek, formatDate } from "../utils";

function MainBox({ data, tempUnit, handleUnitChange }) {
  return (
    <Card className="col-span-2 custom-card" elevation={2}>
      <CardContent className="flex justify-between">
        <div>
          <Chip
            className="mb-6"
            icon={<LocationOnIcon fontSize="small" />}
            label={data.location.name}
            color="primary"
          />
          <div className="text-3xl font-bold">
            {getDayOfWeek(data.location.localtime)}
          </div>
          <div className="mb-3">{formatDate(data.location.localtime)}</div>
          <div className="flex justify-between">
            <Typography variant="body2" className="pr-4">
              <span className="font-bold">High:</span>{" "}
              {tempUnit === "F"
                ? data.forecast.forecastday[0].day.maxtemp_f + "°F"
                : data.forecast.forecastday[0].day.maxtemp_c + "°C"}
            </Typography>
            <Typography variant="body2">
              <span className="font-bold">Low:</span>{" "}
              {tempUnit === "F"
                ? data.forecast.forecastday[0].day.mintemp_f + "°F"
                : data.forecast.forecastday[0].day.mintemp_c + "°C"}
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
              <span style={{ fontSize: "12px", color: "white" }}>°F</span>
            </ToggleButton>
            <ToggleButton
              sx={{
                paddingTop: 0,
                paddingBottom: 0,
              }}
              value="C"
              aria-label="Celsius"
            >
              <span style={{ fontSize: "12px", color: "white" }}>°C</span>
            </ToggleButton>
          </ToggleButtonGroup>

          <div className="flex">
            <div className="text-8xl font-extralight">
              {Math.round(
                tempUnit === "F" ? data.current.temp_f : data.current.temp_c
              )}
            </div>
            <div className="mt-2 text-5xl">
              {tempUnit === "F" ? "°F" : "°C"}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <img
                src={data.current.condition.icon}
                alt="weather icon"
                width={30}
                className="mr-2"
              />
              <Typography
                variant="body2"
                className="capitalize text-left"
                color="white"
              >
                {data.current.condition.text}
              </Typography>
            </div>
            <Typography variant="body2">
              Feels like{" "}
              {tempUnit === "F"
                ? data.current.temp_f + "°F"
                : data.current.feelslike_c + "°C"}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default MainBox;
