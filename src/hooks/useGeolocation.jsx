import { useState } from "react";

// Custom hook to get the user's geolocation
export function useGeolocation(defaultPosition = null) {
  // State to track loading status
  const [isLoading, setIsLoading] = useState(false);
  // State to store the position coordinates (latitude and longitude)
  const [position, setPosition] = useState(defaultPosition);
  // State to store any error messages
  const [error, setError] = useState(null);

  // Function to initiate the geolocation retrieval process
  function getPosition() {
    // Check if the browser supports geolocation
    if (!navigator.geolocation) {
      // Set an error message if geolocation is not supported
      return setError("Your browser does not support geolocation");
    }

    // Set loading state to true while fetching the position
    setIsLoading(true);
    
    // Use the geolocation API to get the current position
    navigator.geolocation.getCurrentPosition(
      // Success callback: called when the position is successfully retrieved
      (pos) => {
        // Update the position state with the retrieved latitude and longitude
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        // Set loading state to false as the position has been retrieved
        setIsLoading(false);
      },
      // Error callback: called when there is an error retrieving the position
      (error) => {
        // Set the error state with the error message
        setError(error.message);
        // Set loading state to false as the attempt to get the position has failed
        setIsLoading(false);
      }
    );
  }

  // Return the loading status, position, error message, and the function to get the position
  return { isLoading, position, error, getPosition };
}