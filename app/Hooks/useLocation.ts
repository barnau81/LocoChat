import { useEffect, useState } from "react";
import { LocationInfo, getCityAndState } from "../Utils/locationUtils";

interface UseLocationResult {
  location: LocationInfo | null;
  isLoading: boolean;
  error: Error | null;
}

export const useLocation = (): UseLocationResult => {
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationInfo = await getCityAndState();
        if (locationInfo) {
          console.log(locationInfo);
        }
        setLocation(locationInfo);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { location, isLoading, error };
};
