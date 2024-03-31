import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function ForecastBox(props) {
  const { header, subHeader, weatherIcon, weatherText, temp, customCss } =
    props;
  return (
    <Card className={customCss} elevation={2}>
      <CardContent className="flex flex-col justify-between items-center h-full">
        <div
          className="flex flex-col items-center"
          color="white"
          display="block"
        >
          <div className="font-bold">{header}</div>
          <div className="font-bold text-sm">{subHeader}</div>
        </div>
        <div className="flex flex-col items-center">
          <img src={weatherIcon} alt={weatherText} width={40} />

          <Typography className="text-center" variant="body2" color="white">
            {weatherText}
          </Typography>
        </div>
        <div
          className="flex items-center text-sm"
          color="white"
          display="block"
        >
          <div className="font-bold">{temp}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ForecastBox;
