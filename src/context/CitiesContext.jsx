import { createContext, useContext, useEffect, useReducer } from "react";

// Define the API URL, using an environment variable or defaulting to localhost
const URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
// Create a context for cities
const CitiesContext = createContext();

// Define the initial state for the context
const initialState = {
  cities: [], // Array to hold the list of cities
  isLoading: false, // Boolean to indicate loading state
  currentCity: {}, // Object to hold the currently selected city
  error: null, // String to hold any error messages
};

// Reducer function to manage state transitions based on dispatched actions
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      // Set loading state and reset error when loading starts
      return { ...state, isLoading: true, error: null };
    case "cities/loaded":
      // Update cities with fetched data and set loading to false
      return { ...state, cities: action.payload, isLoading: false };
    case "city/loaded":
      // Update currentCity with fetched city data and set loading to false
      return { ...state, currentCity: action.payload, isLoading: false };
    case "city/created":
      // Add a new city to the cities array and set loading to false
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "city/deleted":
      // Remove a city from the cities array based on its ID and set loading to false
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };
    case "error":
      // Set error state with the error message and set loading to false
      return { ...state, isLoading: false, error: action.payload };
    default:
      // Throw an error for unknown action types
      throw new Error("Unknown action type");
  }
}

// Provider component to wrap around parts of the app that need access to the cities context
// eslint-disable-next-line react/prop-types
function CitiesProvider({ children }) {
  // Use the reducer to manage the state
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state; // Destructure state

  // Fetch cities when the component mounts
  useEffect(() => {
    fetchCities();
  }, []);

  // Function to fetch the list of cities from the API
  async function fetchCities() {
    dispatch({ type: "loading" }); // Dispatch loading action
    try {
      const res = await fetch(`${URL}/cities`); // Fetch cities from API
      if (!res.ok) throw new Error("Failed to fetch cities"); // Check for errors
      const data = await res.json(); // Parse the response data
      dispatch({ type: "cities/loaded", payload: data }); // Dispatch loaded action with data
    } catch (err) {
      dispatch({ type: "error", payload: err.message }); // Dispatch error action if fetching fails
    }
  }

  // Function to fetch a specific city by ID
  async function getCity(id) {
    dispatch({ type: "loading" }); // Dispatch loading action
    try {
      const res = await fetch(`${URL}/cities/${id}`); // Fetch city by ID
      if (!res.ok) throw new Error("Failed to fetch city"); // Check for errors
      const data = await res.json(); // Parse the response data
      dispatch({ type: "city/loaded", payload: data }); // Dispatch loaded action with city data
    } catch (err) {
      dispatch({ type: "error", payload: err.message }); // Dispatch error action if fetching fails
    }
  }

  // Function to create a new city
  async function createCity(newCity) {
    dispatch({ type: "loading" }); // Dispatch loading action
    try {
      const res = await fetch(`${URL}/cities`, {
        method: "POST", // Set method to POST
        body: JSON.stringify(newCity), // Convert new city data to JSON
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
      });
      if (!res.ok) throw new Error("Failed to create city"); // Check for errors
      const data = await res.json(); // Parse the response data
      dispatch({ type: "city/created", payload: data }); // Dispatch created action with new city data
    } catch (err) {
      dispatch({ type: "error", payload: err.message }); // Dispatch error action if creation fails
    }
  }

  // Function to delete a city by ID
  async function deleteCity(id) {
    dispatch({ type: "loading" }); // Dispatch loading action
    try {
      const res = await fetch(`${URL}/cities/${id}`, {
        method: "DELETE", // Set method to DELETE
      });
      if (!res.ok) throw new Error("Failed to delete city"); // Check for errors
      dispatch({ type: "city/deleted", payload: id }); // Dispatch deleted action with city ID
    } catch (err) {
      dispatch({ type: "error", payload: err.message }); // Dispatch error action if deletion fails
    }
  }

  // Provide the context value to children components
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading, // Loading state
        currentCity, // Currently selected city
        error, // Error state
        getCity, // Function to fetch a specific city
        createCity, // Function to create a new city
        deleteCity, // Function to delete a city
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// Custom hook to use the CitiesContext
function useCities() {
  const context = useContext(CitiesContext); // Access the context value
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider"); // Error if used outside of provider
  }
  return context; // Return the context value
}

// Export the provider and the custom hook for use in other components
export { CitiesProvider, useCities };
