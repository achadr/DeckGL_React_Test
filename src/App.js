import './App.css';
import Map from  './components/Map.js'
import { getActivities, getTripLayer } from './data/fetchData';
import {useState,useEffect} from 'react'




 function App() {
  const [loading, setLoading] = useState(false)
  const [tripLayer, setTripLayer] = useState(null)

  const [data, setData] = useState(null)

  useEffect( () => {
    setLoading(true)
   const activities =  getActivities()
   const tripLayer = getTripLayer()
    setData(activities)
    setTripLayer(tripLayer)
    setLoading(false)
  }, [data])



  return (
   loading?<div>Loading</div> : <Map data={data} tripLayer={tripLayer}/>
  );
}

export default App;
