import { exportFarmToGeoJSON } from './geoJsonExporter';

function testGeoJsonExporter() {
  const coords = [{ lat: 25.6, lng: 85.1 }, { lat: 25.7, lng: 85.2 }, { lat: 25.65, lng: 85.15 }];
  const geojson = exportFarmToGeoJSON('Test Farm', coords);
  console.assert(geojson.type === 'FeatureCollection');
  console.assert(geojson.features[0].geometry.coordinates[0].length === 4); // closed loop
  console.log('GeoJSON exporter test passed!');
}
if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
  testGeoJsonExporter();
}
