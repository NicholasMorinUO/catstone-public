import React, { useState, useCallback } from "react";
import { GoogleMapsProvider } from "@ubilabs/google-maps-react-hooks";
import filterData from "@/components/filterData";
import { MarkerClusterer, SuperClusterAlgorithm } from '@googlemaps/markerclusterer';
import FilterPanel from "@/components/filterPanel";
import ToggleButton from "@/components/toggleButton";
import Image from "next/image";
import Layout from "@/components/layout";
import { queryEntireTable } from "@/components/internalDB/proxy";
import MapLoadingScreen from "@/components/loadingScreen";
import { useEffect } from "react";


export default function MapPage() {

  const [isLoading, setLoading] = useState(true); // True on the first load
  const [mapContainer, setMapContainer] = useState(null);
  const [data, setData] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({});
  const [showPanel, setShowPanel] = useState(false);
  
  const mapConfig = {
    mapId: 'f1642457b09bde52',
    center: { lat: 45.42088064355921, lng: -75.6937171318563 },
    zoom: 12,
    disableDefaultUI: true,
    gestureHandling: 'greedy'
  };

  //Called after every state change
  useEffect(() => {

    const massQuery = async() => {
      try {
        if (data === null){
          const data = await queryEntireTable();
          setData(data);
          setLoading(false);
        }
    
      } catch (error) {
        console.error(error);
      }
    }
    massQuery();
  }, []);

  if(isLoading)
   return <Layout>
      <MapLoadingScreen/>
    </Layout>

  if (!isLoading) {
  return (
    <GoogleMapsProvider
      googleMapsAPIKey={"AIzaSyDnyKn1VeI3lzEIOUdGzSwEPCQolnKJjn0"}
      mapOptions={mapConfig}
      mapContainer={mapContainer}
      // map provided by GoogleMapsProvider
      onLoadMap={(map) => addMarkers(map, filterCriteria)}
    > 
      <Layout>
        <ToggleButton onToggle={ togglePanel } />
        

        <FilterPanel 
          showPanel={showPanel} 
          onFilterCriteriaChange={ (newFilterCriteria) => handleFilterCriteriaChange(newFilterCriteria)}
        >
          <button className='x-button-panel' onClick={togglePanel}>
            <Image src={"images/x.svg"} width={20} height={20} alt="x close button" />
          </button>
        </FilterPanel>

      </Layout>
      <div ref={(node) => setMapContainer(node)} style={{ height: "100vh" }} />
    </GoogleMapsProvider>
  );
  }

  function togglePanel() { setShowPanel(prevShowPanel => !prevShowPanel);};

  function handleFilterCriteriaChange(newFilterCriteria) {
    setFilterCriteria(newFilterCriteria);
    setMapContainer(null);
  };

  function addMarkers(map, filterCriteria) {
  
    let tempBound = []
    let tempunBound = []
  
    const infoWindow = new google.maps.InfoWindow();
    let filteredData = filterData( filterCriteria, data );
    
    const markers = filteredData.map((jsonObjectLiteral) => {
      return generateMarker(jsonObjectLiteral, infoWindow, map, tempBound, tempunBound);
    });
  
    const algorithm = new SuperClusterAlgorithm({
      radius: 300
    })
    
    const cluster = new MarkerClusterer({map, markers, algorithm});
  
    google.maps.event.addListener(map, 'bounds_changed', function() {
      cluster.removeMarkers(tempunBound)
      cluster.addMarkers(tempBound)
    })
  
  }

  // have in seperate file map/generateMarker.js ?
  function generateMarker(jsonObjectLiteral, infoWindow, map, tempBound, tempunBound){
      const marker = new google.maps.Marker({ 
        position: jsonObjectLiteral.position, 
        title: jsonObjectLiteral.animalName, 
        map: map 
      });
  
      marker.setIcon('/images/cat-marker.svg')
  
      marker.addListener("click", () => {
        //info window creation can be in a different file
        infoWindow.setPosition(jsonObjectLiteral.position);
        infoWindow.setContent(`
            <div class="info-window">
              <div>(${jsonObjectLiteral.gender})</div>
              <h1>${jsonObjectLiteral.animalName}</h1>
              <div class="center-inner-text-content">
              <a href="/profile/${jsonObjectLiteral.animal_id}" target="_blank">View More</a>
              </div>
            </div>
          `);
        //open infowindow in the map context
        infoWindow.open({ map });
      });
  
      // manipulate marker rendering using googlemaps event and boundaries
      google.maps.event.addListener(map, 'center_changed', function() {
        if (map.getBounds().contains(marker.getPosition()) && !marker.getVisible()) {
          marker.setVisible(true)
          tempBound.push(marker)
          tempunBound.splice(tempunBound.indexOf(marker), 1)
            
        }
        else if (!map.getBounds().contains(marker.getPosition()) && marker.getVisible()) {
          marker.setVisible(false)
          tempunBound.push(marker)
          tempBound.splice(tempBound.indexOf(marker), 1)
        }
        
        })
        return marker;
  }

}

