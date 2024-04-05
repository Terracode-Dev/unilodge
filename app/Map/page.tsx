// 'use client' should be at the top if using Next.js 13
'use client';

import { MapShower, PinSelectMap } from '@/app/Tools/mapShow';
import { useEffect } from 'react';

export default function Map() {

  const mapPart = new MapShower();

  useEffect(() => {
    
    const exec = async () => {
      const mapDiv = document.getElementById('map');
      if (mapDiv) {
        await mapPart.start(mapDiv);
      }
    };
    exec();
  }, []); // Dependency array to ensure this runs once on component mount

  useEffect(() => {
    // It's better to add markers in a separate useEffect to ensure
    // they are added after the map initialization
    const marker = {

      name: "My Marker",
      func: () => { alert("Marker clicked!"); },
      coordinates: { lat: -34.397, long: 150.644 },
    
    };

    // Add the marker to the map
    mapPart.addMarker(marker);
  }, []); // This ensures markers are added once the component and map are ready

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
}
