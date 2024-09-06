import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  fetch('http://localhost:3000/places').then(res=>res.json()).then(data =>{
    
  })

  return (
    <Places
      title="Available Places"
      places={[]}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
