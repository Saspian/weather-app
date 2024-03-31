import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function CommonBox(props) {
  const {
    icon,
    title,
    data1,
    unit1,
    subData1,
    subData2,
    subDataUnit1,
    subDataUnit2,
    subtitle1,
    subtitle2,
  } = props;
  return (
    <Card className="custom-card" elevation={2}>
      <CardContent className="flex flex-col justify-between h-full">
        <div className="flex items-center mb-2" color="white" display="block">
          {icon}
          <div className="font-bold">{title}</div>
        </div>
        <div className="flex items-center flex-wrap">
          <div className="text-4xl font-bold mr-2">{data1}</div>
          <div className="text-xl">{unit1}</div>
        </div>
        <div>
          <Typography variant="body2" color="white">
            <span className="font-bold">{subtitle1}</span> {subData1}{" "}
            {subDataUnit1}
          </Typography>
          <Typography variant="body2" color="white">
            <span className="font-bold">{subtitle2}</span> {subData2}{" "}
            {subDataUnit2}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default CommonBox;
