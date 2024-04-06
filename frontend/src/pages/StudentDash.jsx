import React, { useState, useEffect } from 'react';
import SearchBar from '../components/Searchbar';
import Map from '../components/Map';
import PropertyCard from '../components/PropertyCardStud';
import { isAuthenticated } from '../utils/authService';
import UnauthorizedPage from './UnAuth';
import { MapShower, PinSelectMap } from '../utils/mapService';

const StudentDash = () => {
    const [properties, setProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState('');

    useEffect(() => {
        // Fetch properties from API
        fetch('/api/properties')
            .then(response => response.json())
            .then(data => setProperties(data))
            .catch(error => console.error('Error fetching properties:', error));

        
        //Adding Map Mechanism

        console.log("data recieved: " , properties);


        //TODO: expected property element
        //{name : "kalton" , longitude : "123.123", latitude : "123.123", description : "some shit"}

    }, []);   
      
    useEffect(() => {
        const mapPart = new MapShower();
        let mapDiv = document.getElementById('map');
        if (!mapDiv) {
          // Perhaps handle the error or retry logic
          console.log("there is no any element with id - map")
          return;
        }
      
        const exec = async () => {
          await mapPart.start(mapDiv);
          

          //test witharai delete krpn
          const propertiesz = [
            {name: "kalton", latitude: "6.821552803820606", longitude: "80.04158362451058", description: "some info"},
            {name: "property A", latitude: "6.821919023919709", longitude: "80.04181147862813", description: "some info"},
            {name: "property B", latitude: "6.820687384070401", longitude: "80.04089164579602", description: "some info"},
            {name: "property C", latitude: "6.822469563994144", longitude: "80.04115790967593", description: "some info"},
            {name: "property D", latitude: "6.820735065151939", longitude: "80.04153228711233", description: "some info"},
            {name: "property E", latitude: "6.8206955085357075", longitude: "80.04227393659575", description: "some info"}
          ];
          
            //TODO: change this to propertise and deleter above property sample list
          propertiesz.forEach((prop) => {
            const marker = {
              name: prop.name,
              func: () => { alert("Marker clicked!"); },
              coordinates: { lat: Number(prop.latitude), long: Number(prop.longitude) },
            };
      
            mapPart.addMarker(marker);
          });
        };
      
        exec();
      }, []); // Dependency array to ensure this runs once on component mount
        
   // This ensures m
        //--End of Map
    

    const handleSearch = (data) => {
        setSearchQuery(data.query);
        setPriceRange(data.priceRange);
        // Handle search functionality here
    };

    return (
        isAuthenticated()?
        <div className="flex flex-col h-screen">
            {/* Search bar */}
            <div className="bg-gray-200 p-4">
                <SearchBar placeholder="Search properties..." onSearch={handleSearch} />
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row flex-1">
                <div className="w-full md:w-1/2 bg-gray-200 p-4 overflow-y-auto">
                    {/* List of properties */}
                    <div className="space-y-4 h-full overflow-y-auto">
                        {/* {properties.map(property => (
                            <PropertyCard
                                key={property.id}
                                title={property.property_name}
                                description={property.description}
                                imageURL={property.imageURL}
                            />
                        ))} */}
                        <PropertyCard title="Property 1" description="Description 1" imageURL="https://via.placeholder.com/300" />
                        <PropertyCard title="Property 2" description="Description 2" imageURL="https://via.placeholder.com/300" />
                        <PropertyCard title="Property 3" description="Description 3" imageURL="https://via.placeholder.com/300" />
                    </div>
                </div>
                <div id='map' className="w-full md:w-1/2 bg-gray-500">
                    {/* Integrated map */}
                    
                </div>
            </div>
        </div>: <div>
            <UnauthorizedPage />
        </div>
    );
};

export default StudentDash;
