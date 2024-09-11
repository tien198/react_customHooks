import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './http.js';
import Error from './components/Error.jsx';
import { useFetch } from './hooks/useFetch.js';

function App() {
  const selectedPlace = useRef();

  const {
    data: userPlaces,
    setData: setUserPlaces,
    isLoading: isLoadingUserPlaces,
    loadingError: errorUserPlaces } = useFetch(fetchUserPlaces, [])

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState()


  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces])
    }
    catch (error) {
      setErrorUpdate({ message: error.message })
      setUserPlaces(userPlaces)
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    setModalIsOpen(false);
    try {
      await updateUserPlaces(userPlaces.filter(place => place.id !== selectedPlace.current.id))
    }
    catch (error) {
      setErrorUpdate({ message: error.message })
      setUserPlaces(userPlaces)
    }
  }, [userPlaces]);

  function handleError() {
    setErrorUpdate(null)
  }

  return (
    <>
      <Modal open={errorUpdate} onClose={handleError}>
        {errorUpdate && <Error title='A Error has occurred!' message={errorUpdate.message} />}
        <button onClick={handleError} className='button'>Ok</button>
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {errorUserPlaces && <Error title='An error occurred!' message={errorUserPlaces.message} />}
        {!errorUserPlaces &&
          <Places
            title="I'd like to visit ..."
            isLoading={isLoadingUserPlaces}
            loadingText='Places is loading ...'
            fallbackText="Select the places you would like to visit below."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
