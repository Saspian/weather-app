import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function TomorrowBox({ data }) {
  return (
    <div>
      <Typography variant="h5" color="white" className="pb-2">
        <span className="font-bold">Tomorrow</span>
      </Typography>
      <Card className="custom-card sm:min-w-0 min-w-56" elevation={2}>
        <CardContent className="flex flex-col justify-between h-full">
          <Typography className="pb-4" variant="body2" color="white">
            <div className="flex items-center">
              <img
                src={data.day.condition.icon}
                alt="weather icon"
                width={30}
                className="mr-2"
              />
              <span>{data.day.condition.text}</span>
            </div>
          </Typography>
          <div className="flex items-center" color="white" display="block">
            <div className="font-bold">Sunrise</div>
          </div>
          <div className="flex items-center mb-3">
            <div className="md:text-4xl font-bold mr-2">
              {data.astro.sunrise}
            </div>
          </div>
          <div className="flex items-center" color="white" display="block">
            <div className="font-bold">Sunset</div>
          </div>
          <div className="flex items-center mb-3">
            <div className="md:text-4xl font-bold mr-2">
              {data.astro.sunset}
            </div>
          </div>
          <div>
            <Typography variant="body2" color="white">
              <span className="font-bold">Moonrise:</span> {data.astro.moonrise}
            </Typography>
            <Typography variant="body2" color="white">
              <span className="font-bold">Moonset:</span> {data.astro.moonset}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TomorrowBox;
