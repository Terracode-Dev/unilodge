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
        fetch('http://localhost:3000/wardens/approved')
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

            //TODO: change this to propertise and deleter above property sample list
          properties.forEach((prop) => {
            const marker = {
              name: prop.name,
              func: () => { alert("Marker clicked!"); },
              coordinates: { lat: Number(prop.lat), long: Number(prop.lng) },
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
        //console.log("seach text:" , data.searchText);
        setPriceRange(data.priceRange);
        //console.log("proce range is: " , data.priceRange);
        // Handle search functionality here

        fetch('http://localhost:3000/wardens/approved')
            .then(response => response.json())
            .then(dataset => {
                let newSet = dataset.filter((prop) => {
                    let qryName = prop.name.toLowerCase();
                    let searchName = data.searchText.toLowerCase();
                    console.log("single prop: ", prop);
                    if (data.priceRange === "min") {
                        return qryName.includes(searchName) && prop.price < 10000;
                    } else if (data.priceRange === "mid") {
                        return qryName.includes(searchName) && prop.price >= 10000 && prop.price <= 25000;
                    } else if (data.priceRange === "max") {
                        return qryName.includes(searchName) && prop.price > 25000;
                    }  else {
                        return qryName.includes(searchName);
                    }
            });
                //console.log("new updated set: ", newSet);
                setProperties(newSet);
            })
            .catch(error => console.error('Error fetching properties:', error));

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
                         {properties.map(property => (
                            <PropertyCard
                                key={property.propid}
                                title={property.name}
                                description={property.description}
                                imageURL={property.picture}
                                price={property.price}
                                address={property.address}
                                contact={property.contact}
                                
                            />
                        ))}
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
