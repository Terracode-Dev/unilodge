

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

 
export default class MapShower {
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
  