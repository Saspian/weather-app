import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getDayOfWeek, isToday, isTomorrow } from "../utils";

function ForecastChartDaily({ data, tempUnit }) {
  const [hourlyDataHigh, setHourlyDataHigh] = useState([]);
  const [hourlyDataLow, setHourlyDataLow] = useState([]);

  useEffect(() => {
    if (tempUnit === "F") {
      setHourlyDataHigh(getHourlyHighDataFarenheit());
      setHourlyDataLow(getHourlyLowDataFarenheit());
    } else {
      setHourlyDataHigh(getHourlyHighDataCelsius());
      setHourlyDataLow(getHourlyLowDataCelsius());
    }
  }, [tempUnit]);

  function getHours() {
    return data.map((h) => {
      return isToday(h.date)
        ? "Today"
        : isTomorrow(h.date)
        ? "Tomorrow"
        : getDayOfWeek(h.date);
    });
  }

  function getHourlyHighDataCelsius() {
    return data.map((h) => {
      return +h.day.maxtemp_c;
    });
  }
  function getHourlyHighDataFarenheit() {
    return data.map((h) => {
      return +h.day.maxtemp_f;
    });
  }

  function getHourlyLowDataFarenheit() {
    return data.map((h) => {
      return +h.day.mintemp_f;
    });
  }
  function getHourlyLowDataCelsius() {
    return data.map((h) => {
      return +h.day.mintemp_c;
    });
  }

  const state = {
    series: [
      {
        name: `High (${tempUnit === "F" ? "°F" : "°C"})`,
        data: hourlyDataHigh,
      },
      {
        name: `Low (${tempUnit === "F" ? "°F" : "°C"})`,
        data: hourlyDataLow,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        theme: "dark",
      },
      stroke: {
        width: 5,
        curve: "smooth",
      },
      xaxis: {
        type: "category",
        categories: getHours(),
      },
      title: {
        align: "left",
        style: {
          fontSize: "16px",
          color: "#666",
        },
      },
      colors: ["#FF9800", "#2E93fA"],
      fill: {
        // type: "gradient",
        // gradient: {
        //   shade: "dark",
        //   gradientToColors: ["#FDD835"],
        //   shadeIntensity: 1,
        //   type: "horizontal",
        //   opacityFrom: 1,
        //   opacityTo: 1,
        //   stops: [0, 100, 100, 100],
        // },
      },
      yaxis: {
        min: Math.min(...hourlyDataLow) - 4,
        max: Math.max(...hourlyDataHigh) + 4,
      },
    },
  };
  return (
    <Chart
      options={state.options}
      series={state.series}
      type="line"
      height={350}
    />
  );
}

export default ForecastChartDaily;
