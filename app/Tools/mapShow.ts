

declare global {
    interface Window {
      initMap: () => void;
    }
}

type MarkerObject = {
    name: string;
    func: () => void;
    coordinates: {
      lat: number;
      long: number;
    };
  };

 
class MapShower {
    private map: google.maps.Map | null;
    private MarkerSet: Array<MarkerObject>;
  
    constructor() {
      this.map = null;
      this.MarkerSet = [];
    }
  
    loadGoogleMapsScript(callback: string) {
      const existingScript = document.getElementById('googleMapsScript') as HTMLScriptElement;
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBx3jK9z6l0N9yKV9rFLYmn9inCrMISVEo&callback=${callback}`;
        script.async = true;
        script.defer = true;
        script.id = 'googleMapsScript';
        document.head.appendChild(script);
      } else if (callback) {
        (window as any)[callback]();
      }
    }
  
    initMap(mapDiv: HTMLElement) {
      if (!this.map) { // Ensure map is not already initialized
        this.map = new google.maps.Map(mapDiv, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });
  
        // Add markers to the map
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
  
    async start(mapDiv: HTMLElement) {
      window.initMap = () => this.initMap(mapDiv); // Assign initMap function to window scope
      this.loadGoogleMapsScript("initMap");
    }
  
    // Method to add a marker to the MarkerSet
    addMarker(markerObj: MarkerObject) {
      this.MarkerSet.push(markerObj);
      // If map is already initialized, add the marker immediately
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
  
  // Make sure to replace "YOUR_API_KEY" with your actual Google Maps API key.
  // Also, add `declare let google: any;` at the top of your file if you're not including the Google Maps types for TypeScript.
  

  //tool to have the map draggble and choose a location

 class PinSelectMap {
    private map: google.maps.Map | null;
    private mapDiv: HTMLElement | null;
    private DefaultcenterPoint = { lat: -34.397, lng: 150.644 };
    private centerMarker: google.maps.Marker | null = null;
  
    constructor() {
      this.map = null;
      this.mapDiv = null;
    }
  
    loadGoogleMapsScript(callback: string) {
      const existingScript = document.getElementById('googleMapsScript') as HTMLScriptElement;
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBx3jK9z6l0N9yKV9rFLYmn9inCrMISVEo&callback=${callback}`;
        script.async = true;
        script.defer = true;
        script.id = 'googleMapsScript';
        document.head.appendChild(script);
      } else if (callback) {
        (window as any)[callback]();
      }
    }
  
    initMap(mapDiv: HTMLElement) {
      this.mapDiv = mapDiv;
      if (!this.map) {
        this.map = new google.maps.Map(mapDiv, {
          center: this.DefaultcenterPoint, // Default center of the map
          zoom: 8,
        });
  

        this.centerMarker = new google.maps.Marker({
          position: this.DefaultcenterPoint,
          map: this.map,
          // Optionally, use a custom icon for the center marker
          // icon: 'path/to/custom/icon.png',
        });
  
        // Ensure the marker stays centered when the map is dragged
        this.map.addListener('drag', () => {
          const center = this.map!.getCenter();
          this.centerMarker!.setPosition(center);
        });
        // Listen for dragend event to capture the location
        this.map.addListener('dragend', () => {
          const center = this.map!.getCenter();
          this.captureLocation(center.lat(), center.lng());
        });
      }
    }
  
    start(mapDiv: HTMLElement) {
      window.initMap = () => this.initMap(mapDiv); // Assign initMap function to window scope
      this.loadGoogleMapsScript("initMap");
    }
  
    // Confirm button eken mek call krpn cordinates wlt oni deyk krnn
    captureLocation(lat: number, lng: number) {
      console.log(`Location Captured: Lat: ${lat}, Lng: ${lng}`);
      // Perform your action here, e.g., returning the coordinates or displaying them
      // For now, we're just logging the coordinates to the console
    }
  }
  

  export { MapShower, PinSelectMap };