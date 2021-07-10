import React from 'react';
import DeckGL, {TripsLayer} from 'deck.gl';
import {StaticMap} from 'react-map-gl';
import {ArcLayer} from '@deck.gl/layers';
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import {BASEMAP} from '@deck.gl/carto';





  
  // DeckGL react component
  export default function Map({data, tripLayer}) {
    const INITIAL_VIEW_STATE = {
      longitude: data ? Number(data[0].lon) : 0,
      latitude: data ? Number(data[0].lat) : 0,
      zoom: 10.5,
      pitch: 0,
      bearing: 0
    };
  return <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      >

      
       <StaticMap
        id="base-map"
        mapStyle={BASEMAP.DARK_MATTER}
        stroked={true}
        filled={false}
        lineWidthMinPixels={2}
        opacity={0.4}
        getLineColor={[60, 60, 60]}
        getFillColor={[200, 200, 200]}
      />
      <HexagonLayer 
      id="activity" 
      data={data}
      getPosition= {d =>  ([Number(d.lon),Number(d.lat)])}
      extruded={true}
      radius={250}
      elevationScale = {10}
      colorRange={[[37,52,148],[255,255,0],[0,109,44]]}
      getColorValue = {hexabinActivities =>{

        const homeActivities = hexabinActivities.filter(a => a.type ==="home")
        const leisureActivities = hexabinActivities.filter(a => a.type ==="leisure")
        const otherActivities = hexabinActivities.filter(a => a.type !== "leisure" && a.type !== "home")

        const activityWeigths = [homeActivities.length, leisureActivities.length, otherActivities.length]

        const majorityWeight = Math.max(...activityWeigths)
        const activityTypeIndex = activityWeigths.indexOf(majorityWeight)
        
        
        switch(activityTypeIndex) {
          case 0 : 
           return 0
          case 1 :
            return 1
          case 2 : 
            return 2
        }

      } }
      
      />
      <ArcLayer
      id="arc-layer"
      data = {tripLayer}
      getSourcePosition= {d => d[0]}
      getTargetPosition= {d => d[1]}
      getTargetColor={d => [255,255,255]}
      getSourceColor={d => [255,0,0]}
      getWidth={0.1}

      />
 

      
      
      </DeckGL>;
}