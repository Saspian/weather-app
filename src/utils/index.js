export const getDayOfWeek = (dateString) => {
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

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate;
};

export const getUVIndexCategory = (uvIndex) => {
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

export const getAirQualityIndex = (index) => {
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

export const roundOffHours = () => {
  const date = new Date();
  let hour = date.getHours();
  if (date.getMinutes() >= 30) {
    hour += 1;
  }
  const roundedHour = hour.toString().padStart(2, "0");
  return `${roundedHour}:00`;
};

export const getCurrentDate = (data) => {
  const currentDate = new Date(data);
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate;
};

export const isToday = (data) => {
  const date = new Date(data);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isTomorrow = (data) => {
  const date = new Date(data);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
};

export const getHighLowTemp = (data, tempUnit) => {
  return `${
    tempUnit === "F"
      ? Math.round(data.mintemp_f) + " °F"
      : Math.round(data.mintemp_c) + " °C"
  } / ${
    tempUnit === "F"
      ? Math.round(data.maxtemp_f) + " °F"
      : Math.round(data.maxtemp_c) + " °C"
  }`;
};
