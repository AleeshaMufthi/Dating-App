import { Autocomplete, GoogleMap, Marker } from "@react-google-maps/api";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

const LocationPicker = ({ onSave }) => {
  const [placeName, setPlaceName] = useState("");
  const [position, setPosition] = useState(null);

  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place?.geometry) return;

     const photos = place.photos ? place.photos.slice(0, 3).map(p => p.getUrl()) : [];

    setPlaceName(place.formatted_address);
    setPosition({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });

      onSave({
    placeName: place.formatted_address,
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng(),
    images: photos
  });
  
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
      <Autocomplete
        onLoad={(ref) => (autocompleteRef.current = ref)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Where do you want to travel?"
          className="w-full p-3 border rounded-md"
        />
      </Autocomplete>

      {position && (
        <GoogleMap
          center={position}
          zoom={14}
          mapContainerStyle={{ width: "100%", height: "200px" }}
        >
          <Marker position={position} />
        </GoogleMap>
      )}

      <button
        className="mt-4 w-full p-3 bg-yellow-500 text-white rounded-lg"
        onClick={() => onSave({ placeName, ...position })}
      >
        Save Location
      </button>
    </div>
  );
};

export default LocationPicker;
