import { useEffect, useState } from 'react';
import Places from './Places.jsx';

import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/useFetch.js';



async function fetchAndSortPlaces() {
  const fetched = await fetchAvailablePlaces()

  const places = new Promise(resolve => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        fetched,
        position.coords.latitude,
        position.coords.longitude
      )
      resolve(sortedPlaces)
    })
  })
  return places
}

export default function AvailablePlaces({ onSelectPlace }) {
  // Triple state need to fetch data

  const {
    data: availablePlaces,
    isLoading,
    loadingError: error,
  } = useFetch(fetchAndSortPlaces, [])

  if (error) {
    return <Error title='An error occurred' message={error.message} />
  }
  return (
    <Places
      title="Available Places"
      isLoading={isLoading}
      loadingText='Places is loading ...'
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
