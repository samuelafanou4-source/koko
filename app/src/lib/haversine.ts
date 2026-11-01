/**
 * Formule de Haversine pour calculer la distance orthodromique (à vol d'oiseau)
 * entre deux coordonnées géographiques (latitude/longitude) en kilomètres.
 */

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

const EARTH_RADIUS_KM = 6371;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function calculateDistanceKm(
  coord1: GeoLocation,
  coord2: GeoLocation
): number {
  const dLat = toRadians(coord2.latitude - coord1.latitude);
  const dLon = toRadians(coord2.longitude - coord1.longitude);

  const lat1 = toRadians(coord1.latitude);
  const lat2 = toRadians(coord2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = EARTH_RADIUS_KM * c;
  return Math.round(distance * 10) / 10; // Rounded to 1 decimal place (e.g. 2.4 km)
}

export function sortNearestFirst<T extends GeoLocation>(
  userLocation: GeoLocation,
  items: T[]
): (T & { distanceKm: number })[] {
  return items
    .map((item) => ({
      ...item,
      distanceKm: calculateDistanceKm(userLocation, item),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

