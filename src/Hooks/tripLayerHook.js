/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react';

export const useTripLayerHandlers = () => {
  const [currentTime, setCurrentTime] = useState(0);

  // la valeur la plus grandes de timstamps moins la valeurs la plus petites(ecart)
  const TRIPS_DURATION_SECONDES = 60000;
  const ANIMATION_STEP_SECONDES = 100;
  const REFRESH_TIME_MS = 33;

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTime > TRIPS_DURATION_SECONDES) {
        setCurrentTime(0);
      } else {
        setCurrentTime(currentTime + ANIMATION_STEP_SECONDES);
      }
    }, REFRESH_TIME_MS);
    return () => clearInterval(interval);
  }, [currentTime]);

  const getTimestamps = (d) => {
    const startTime = Math.min(...d.geometry.coordinates.map((c) => c[3]));
    return d.geometry.coordinates.map((c) => c[3] - startTime);
  };

  return [currentTime, getTimestamps];
};
