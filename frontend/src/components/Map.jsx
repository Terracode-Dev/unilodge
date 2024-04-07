import React from 'react'
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from '@vis.gl/react-google-maps';

const MapContainer = () => {
    const position = {lat:6.82, lng:80.04}
    const key = 'AIzaSyBx3jK9z6l0N9yKV9rFLYmn9inCrMISVEo'

  return (
    <APIProvider apiKey={key}>
        <div className='h-svh'>
            <Map 
                zoom={16} 
                defaultCenter={position}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            >
            </Map>
        </div>
    </APIProvider>
  )
}

export default MapContainer
