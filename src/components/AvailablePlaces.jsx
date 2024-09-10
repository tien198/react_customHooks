import { useEffect, useState } from 'react';
import Places from './Places.jsx';

import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';


export default function AvailablePlaces({ onSelectPlace }) {
  // Triple state need to fetch data
  const [availablePlaces, setAvailablePlaces] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const fetchedPlaces = await fetchAvailablePlaces()
        navigator.geolocation.getCurrentPosition((position) => {

          const sortedPlaces = sortPlacesByDistance(
            fetchedPlaces,
            position.coords.latitude,
            position.coords.longitude
          )
          setAvailablePlaces(sortedPlaces)

          setAvailablePlaces(fetchedPlaces)
          setIsLoading(false)
        })
      }
      catch (error) {
        console.warn(error.message);
        setError({ message: error.message || 'Coundn\' fetch places, please try again later!' })
        setIsLoading(false)
      }
    }

    fetchPlaces()
  }, [])

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
