import axios from "axios";

export interface LocationInfo {
  country: string;
  countryCode: string;
  county: string;
  houseNumber: string;
  postalCode: string;
  residential: string;
  road: string;
  state: string;
  latitude: number;
  longitude: number;
}

export const getCityAndState = async (): Promise<LocationInfo> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    } else {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const { data } = await axios.get(
              `https://nominatim.openstreetmap.org/reverse`,
              {
                params: {
                  format: "json",
                  lat: latitude,
                  lon: longitude,
                },
              }
            );
            resolve({
              country: data.address.country || "Unknown",
              countryCode: data.address.country_code || "Unknown",
              county: data.address.county || "Unknown",
              houseNumber: data.address.house_number || "Unknown",
              postalCode: data.address.postcode || "Unknown",
              residential: data.address.residential || "Unknown",
              road: data.address.road || "Unknown",
              state: data.address.state || "Unknown",
              latitude: parseFloat(data.lat),
              longitude: parseFloat(data.lon),
            });
          } catch (error) {
            console.error(error);
            reject(new Error("Failed to fetch location info"));
          }
        },
        () => {
          reject(new Error("Unable to retrieve your location"));
        }
      );
    }
  });
};
