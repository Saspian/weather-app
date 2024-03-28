import React, { useEffect, useState } from "react";

function LocationTracker({ setLocation }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      setError("");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      {error && (
        <>
          <div className="flex h-screen items-center justify-center text-red-500">
            Error: {error}
          </div>
        </>
      )}
    </div>
  );
}

export default LocationTracker;
