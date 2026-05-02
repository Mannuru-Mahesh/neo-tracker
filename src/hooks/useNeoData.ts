import { useState, useEffect } from 'react';
import type { AsteroidData, NeoApiResponse } from '../types';

export const useNeoData = () => {
  const [data, setData] = useState<AsteroidData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNeoData = async () => {
      try {
        setLoading(true);
        // Get today's date in YYYY-MM-DD
        const today = new Date().toISOString().split('T')[0];
        const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=DEMO_KEY`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch NASA NEO data');
        }

        const json: NeoApiResponse = await res.json();
        const asteroidsRaw = json.near_earth_objects[today] || [];

        const parsedData: AsteroidData[] = asteroidsRaw.map((neo) => {
          // Generate random position around the globe for visualization
          // Using spherical coordinates for random distribution
          const phi = Math.acos(1 - 2 * Math.random()); // 0 to PI
          const theta = Math.random() * 2 * Math.PI; // 0 to 2PI
          
          // Latitude from -90 to 90
          const lat = (phi / Math.PI) * 180 - 90;
          // Longitude from -180 to 180
          const lng = (theta / Math.PI) * 180 - 180;
          
          // Map miss distance (usually millions of km) to an altitude scale
          // Earth radius in scene is 1. We want asteroids between 0.1 and 1.5 units above surface
          const missDistKm = parseFloat(neo.close_approach_data[0].miss_distance.kilometers);
          const maxDist = 75000000; // rough max miss distance in km
          const normalizedDist = Math.min(missDistKm / maxDist, 1.0);
          const altitude = 0.2 + (normalizedDist * 1.5) + (Math.random() * 0.2);

          return {
            id: neo.id,
            name: neo.name,
            estimatedDiameterMax: neo.estimated_diameter.kilometers.estimated_diameter_max,
            isHazardous: neo.is_potentially_hazardous_asteroid,
            velocityKps: neo.close_approach_data[0].relative_velocity.kilometers_per_second,
            missDistanceKm: neo.close_approach_data[0].miss_distance.kilometers,
            lat,
            lng,
            altitude
          };
        });

        setData(parsedData);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        
        // Fallback mock data in case API limit reached
        setData([
          { id: '1', name: 'Mock Asteroid Alpha', estimatedDiameterMax: 0.5, isHazardous: true, velocityKps: '15.2', missDistanceKm: '1200000', lat: 30, lng: 45, altitude: 0.5 },
          { id: '2', name: 'Mock Asteroid Beta', estimatedDiameterMax: 1.2, isHazardous: false, velocityKps: '8.4', missDistanceKm: '3500000', lat: -20, lng: -60, altitude: 0.8 },
          { id: '3', name: 'Mock Asteroid Gamma', estimatedDiameterMax: 0.1, isHazardous: false, velocityKps: '22.1', missDistanceKm: '800000', lat: 70, lng: 120, altitude: 0.3 },
          { id: '4', name: 'Mock Asteroid Delta', estimatedDiameterMax: 2.5, isHazardous: true, velocityKps: '35.6', missDistanceKm: '500000', lat: -40, lng: 10, altitude: 0.2 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNeoData();
  }, []);

  return { data, loading, error };
};
