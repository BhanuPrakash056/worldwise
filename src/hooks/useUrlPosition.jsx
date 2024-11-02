import { useSearchParams } from "react-router-dom";

/**
 * Custom hook to retrieve latitude and longitude from the URL search parameters.
 *
 * This hook uses the `useSearchParams` hook from `react-router-dom` to extract
 * the values of `lat` and `lng` from the current URL. It returns an array
 * containing the latitude and longitude as strings. If the parameters are not
 * present in the URL, the returned values will be `null`.
 *
 * Usage:
 * const [latitude, longitude] = useUrlPosition();
 *
 * @returns {[string|null, string|null]} An array containing the latitude and longitude.
 */
export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
