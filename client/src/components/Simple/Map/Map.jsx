import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerIconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

function Map() {
  useEffect(() => {
    // load icon images
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIconRetinaUrl,
      iconUrl: markerIconPng,
      shadowUrl: markerShadowPng,
    });

    // create map
    const map = L.map('map').setView([50.4501, 30.5234], 13);

    // add marker
    L.marker([50.4501, 30.5234]).addTo(map);

    // add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        "Map data © <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors",
      maxZoom: 18,
    }).addTo(map);
  }, []);

  return <div id="map" style={{ height: '300px', width: '500px' }} />;
}

export default Map;
