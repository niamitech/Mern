import React, { useState, useEffect } from 'react';
import { GoogleMap, HeatmapLayer, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = { width: '100%', height: '600px' };
const defaultCenter = { lat: 20.5937, lng: 78.9629 };

function Heatmap() {
  const [heatmapData, setHeatmapData] = useState([]);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['visualization']
  });

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        const response = await axios.get('/api/leads/heatmap-data');
        const points = response.data.data.map(point => ({
          location: new window.google.maps.LatLng(point.lat, point.lng),
          weight: point.weight
        }));
        setHeatmapData(points);
      } catch (err) {
        console.error('Error fetching heatmap data:', err);
      }
    };
    fetchHeatmapData();
  }, []);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={4}
    >
      <HeatmapLayer data={heatmapData} options={{ radius: 30, opacity: 0.6 }} />
    </GoogleMap>
  );
}

export default Heatmap;
