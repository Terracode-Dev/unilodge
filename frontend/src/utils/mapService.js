class MapShower {
    constructor() {
      this.map = null;
      this.MarkerSet = [];
    }
  
    loadGoogleMapsScript(callback) {
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
  
    initMap(mapDiv) {
      if (!this.map) {
        this.map = new google.maps.Map(mapDiv, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
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
      this.loadGoogleMapsScript("initMap");
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
  