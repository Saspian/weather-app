import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function ForecastChartHourly({ data, tempUnit }) {
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    if (tempUnit === "F") {
      setHourlyData(getHourlyDataFarenheit());
    } else {
      setHourlyData(getHourlyDataCelsius());
    }
  }, [tempUnit]);

  function getHours() {
    return data.map((h) => {
      return h.time.split(" ")[1];
    });
  }

  function getHourlyDataCelsius() {
    return data.map((h) => {
      return +h.temp_c;
    });
  }

  function getHourlyDataFarenheit() {
    return data.map((h) => {
      return +h.temp_f;
    });
  }

  function forecastCount(targetHour) {
    const now = new Date();
    const target = new Date();
    target.setHours(targetHour, 0, 0, 0);
    let diff = target - now;
    if (diff < 0) {
      target.setDate(target.getDate() + 1);
      diff = target - now;
    }
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    return hoursLeft + 1;
  }

  const state = {
    series: [
      {
        name: `Temp (${tempUnit === "F" ? "°F" : "°C"})`,
        data: hourlyData,
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
      forecastDataPoints: {
        count: forecastCount(23),
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
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#FDD835"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      yaxis: {
        min: Math.min(...hourlyData) - 4,
        max: Math.max(...hourlyData) + 4,
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

export default ForecastChartHourly;
