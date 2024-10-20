// Function to convert degrees to radians
const degreesToRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Function to calculate distance between two points using the Haversine formula
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 3959; // Radius of the Earth in miles
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
};

// Main function to check if coordinates are within radius
export const isWithinRadius = async (
  radiusInMiles: number,
  targetLat: number,
  targetLon: number
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const clientLat = position.coords.latitude;
        const clientLon = position.coords.longitude;

        const distance = calculateDistance(
          clientLat,
          clientLon,
          targetLat,
          targetLon
        );

        resolve(distance <= radiusInMiles);
      },
      (error) => {
        reject(new Error(`Geolocation error: ${error.message}`));
      }
    );
  });
};
