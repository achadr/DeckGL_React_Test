/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/extensions */
import './App.css';
import { useState, useEffect } from 'react';
import Map from './components/Map.js';
import { getActivities, getTripLayer } from './data/fetchData';

function App() {
  const [loading, setLoading] = useState(false);
  const [tripLayer, setTripLayer] = useState(null);

  const [activities, setActivities] = useState(null);

  useEffect(() => {
    setLoading(true);
    const activitiesData = getActivities();
    const tripLayerData = getTripLayer();
    setActivities(activitiesData);
    setTripLayer(tripLayerData);
    setLoading(false);
  }, [activities, tripLayer]);

  return (
    loading ? <div>Loading</div> : <Map activities={activities} tripLayer={tripLayer} />
  );
}

export default App;
