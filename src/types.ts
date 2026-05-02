export interface AsteroidData {
  id: string;
  name: string;
  estimatedDiameterMax: number;
  isHazardous: boolean;
  velocityKps: string;
  missDistanceKm: string;
  // Position around the globe
  lat: number;
  lng: number;
  altitude: number; // distance from surface
}

export interface NeoApiResponse {
  element_count: number;
  near_earth_objects: Record<string, any[]>;
}
