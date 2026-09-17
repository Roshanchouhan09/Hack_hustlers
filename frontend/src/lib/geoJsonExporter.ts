export interface Coordinates {
  lat: number;
  lng: number;
}

export function exportFarmToGeoJSON(farmName: string, polygonCoords: Coordinates[]) {
  const coordinates = polygonCoords.map((c) => [c.lng, c.lat]);
  if (coordinates.length > 0) {
    coordinates.push(coordinates[0]); // close polygon loop
  }

  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: farmName,
          crop: "Wheat (HD-2967)",
          area_acres: 12.5,
          timestamp: new Date().toISOString()
        },
        geometry: {
          type: "Polygon",
          coordinates: [coordinates]
        }
      }
    ]
  };
}
