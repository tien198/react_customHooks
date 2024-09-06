import { useEffect, useState } from 'react';
import Places from './Places.jsx';

import { serverUrl } from '../env.json';


export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([])

  useEffect(() => {
    async function fetchPlaces() {
      const respond = await fetch(`${serverUrl}/places`)
      const resData = await respond.json()
      setAvailablePlaces(resData.places)
    }
    fetchPlaces()
  }, [])

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
