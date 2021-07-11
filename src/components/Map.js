/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import DeckGL, { TripsLayer } from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { BASEMAP } from '@deck.gl/carto';
import { useTripLayerHandlers } from '../Hooks/tripLayerHook';
import { useActivitiesHandlers } from '../Hooks/activitiesHook';

// DeckGL react component
export default function Map({ activities, tripLayer }) {
  const [currentTime, getTimestamps] = useTripLayerHandlers();
  const [getColorValue, INITIAL_VIEW_STATE, COLORS] = useActivitiesHandlers(activities);

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller
    >

      <StaticMap
        id="base-map"
        mapStyle={BASEMAP.DARK_MATTER}
        stroked
        filled={false}
        lineWidthMinPixels={2}
        opacity={0.4}
        getLineColor={[60, 60, 60]}
        getFillColor={[200, 200, 200]}
      />

      <TripsLayer
        id="trips-laye"
        data={tripLayer && tripLayer.features}
        getColor={() => [255, 0, 0]}
        getPath={(d) => d.geometry.coordinates.filter((c, index) => index !== 3)}
        getTimestamps={getTimestamps}
        currentTime={currentTime}
        widthMinPixels={2}
        trailLength={120}
        opacity={1}
      />

      <HexagonLayer
        id="activity"
        data={activities}
        getPosition={(d) => ([Number(d.lon), Number(d.lat)])}
        extruded
        radius={250}
        elevationScale={10}
        colorRange={COLORS}
        getColorValue={getColorValue}
      />

    </DeckGL>
  );
}
