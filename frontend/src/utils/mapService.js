// maps.js

// Declare global window object to attach the initMap function
window.initMap = () => {};

function loadGoogleMapsScript(callback) {
  const existingScript = document.getElementById('googleMapsScript');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBx3jK9z6l0N9yKV9rFLYmn9inCrMISVEo&callback=${callback}`;
    script.async = true;
    script.defer = true;
    script.id = 'googleMapsScript';
    document.head.appendChild(script);
  } else if (callback) {
    window[callback]();
  }
}

class MapShower {
  constructor() {
    this.map = null;
    this.MarkerSet = [];
    this.DefaultcenterPoint = { lat: 6.821552803820606, lng: 80.04158362451058 };
    
  }

  async initMap(mapDiv) {
    if (!this.map) {
      this.map = new google.maps.Map(mapDiv, {
        center: this.DefaultcenterPoint,
        zoom: 15,
      });

      this.MarkerSet.forEach((markerObj) => {
        let marker = new google.maps.Marker({
          position: { lat: markerObj.coordinates.lat, lng: markerObj.coordinates.long },
          map: this.map,
          title: markerObj.name,
        });

        marker.addListener('click', markerObj.func);
      });
    }
  }

  start(mapDiv) {
    window.initMap = () => this.initMap(mapDiv);
    loadGoogleMapsScript("initMap");
  }

  addMarker(markerObj) {
    this.MarkerSet.push(markerObj);
    if (this.map) {
      let marker = new google.maps.Marker({
        position: { lat: markerObj.coordinates.lat, lng: markerObj.coordinates.long },
        map: this.map,
        title: markerObj.name,
      });
      marker.addListener('click', markerObj.func);
    }
  }
}

class PinSelectMap {
  constructor() {
    this.map = null;
    this.mapDiv = null;
    this.DefaultcenterPoint = { lat: 6.821552803820606, lng: 80.04158362451058 };
    this.centerMarker = null;
    this.centerPoint = null;
    this.capturedLocation = null;
  }

  initMap(mapDiv) {
    this.mapDiv = mapDiv;
    if (!this.map) {
      this.map = new google.maps.Map(mapDiv, {
        center: this.DefaultcenterPoint,
        zoom: 15,
      });

      this.centerMarker = new google.maps.Marker({
        position: this.DefaultcenterPoint,
        map: this.map,
      });

      this.map.addListener('drag', () => {
        const center = this.map.getCenter();
        this.centerMarker.setPosition(center);
      });

      this.map.addListener('dragend', () => {
        const center = this.map.getCenter();
        this.captureLocation(center.lat(), center.lng());
      });
    }
  }

  start(mapDiv) {
    window.initMap = () => this.initMap(mapDiv);
    loadGoogleMapsScript("initMap");
  }


  captureLocation(lat, lng) {
    this.capturedLocation = { lat, lng };
    console.log(`Location Captured: Lat: ${lat}, Lng: ${lng}`);
  }

  getCapturedLocation() {
    //console.log("captured location");
    return this.capturedLocation;
  }
}

// Exporting the classes is not needed in a purely JavaScript context,
// but if you're using modules, you can uncomment the following:
export { MapShower, PinSelectMap };
