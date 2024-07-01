import { useState, useEffect } from "react";

export function useCustomHook() {
  const [isLoadng, setIsLoading] = useState(false);
  const [position, setPosition] = useState([]);

  function getPos() {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setPosition(() => [lat, lng]);
      setIsLoading(false);
    }),
      (err) => console.log(err);
  }

  useEffect(getPos, []);

  return [isLoadng, position, getPos];
}
