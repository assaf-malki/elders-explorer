import React, { useState, useEffect } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

function AddressInput({
  disabled,
  setLocation,
  setLocationText,
  initialAddress = '',
}) {
  const [address, setAddress] = useState(initialAddress);

  const apiKey = process.env.REACT_APP_MAPS_API_KEY;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  // Effect to sync the component's state with the incoming prop
  useEffect(() => {
    setAddress(initialAddress);
  }, [initialAddress]); // Only re-run the effect if initialAddress changes

  const handlePlaceSelect = autocomplete => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      console.error('No details available for input: ' + place.name);
      return;
    }

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setAddress(place.formatted_address);
    setLocation({ lat, lon: lng });
    setLocationText(place.formatted_address);
  };

  const onLoad = autocomplete => {
    autocomplete.addListener('place_changed', () =>
      handlePlaceSelect(autocomplete)
    );
  };

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  return isLoaded ? (
    <div>
      <Autocomplete onLoad={onLoad}>
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="הכנס כתובת"
          className="form-control"
          disabled={disabled}
          onKeyDown={handleKeyDown} // Prevent form submission on enter
        />
      </Autocomplete>
      <label className="d-block fs-6">
        הכנס כתובת או לחץ על הכפתור כדי להשתמש במיקום הנוכחי שלך
      </label>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default AddressInput;
