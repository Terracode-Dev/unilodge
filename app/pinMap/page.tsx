'use client'
import React, { useEffect } from 'react';
import { MapShower, PinSelectMap } from '@/app/Tools/mapShow';// Assume PinSelectMap is in the same directory

export default function SelectLocationMap() {
  const mapPart = new PinSelectMap();

  useEffect(() => {
    const exec = async () => {
      const mapDiv = document.getElementById('map');
      if (mapDiv) {
        await mapPart.start(mapDiv);
      }
    };
    exec();
  }, []); // Dependency array to ensure this runs once on component mount

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
}
