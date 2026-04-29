import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';

const MapController = () => {
  const map = useMap();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lat = params.get('lat');
    const lng = params.get('lng');
    if (lat && lng) {
      map.flyTo([parseFloat(lat), parseFloat(lng)], 5, {
        duration: 2.5
      });
      // Optionally remove params from URL without refreshing so it doesn't fly again on subsequent re-renders
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [map]);
  return null;
};
const GlobalThreatMap = ({ threats = [] }) => {
  const [map, setMap] = useState(null);

  // Dynamic Visuals: hook that handles threats changing
  useEffect(() => {
    if (threats.length > 0) {
      console.log(`Dynamic update: tracking ${threats.length} threats globally.`);
    }
  }, [threats]);


  return (
    <div className="rounded-xl overflow-hidden border border-slate-700 shadow-[0_0_15px_rgba(6,182,212,0.15)] relative z-0">
      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        style={{ height: '500px', width: '100%', background: '#0b1016' }}
        preferCanvas={true} // Performance: Crucial for rendering thousands of points
        ref={setMap}
      >
        {/* Dark Theme CartoDB Tileset */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        <MapController />
        
        {threats.map((t) => (
          <CircleMarker 
            key={t.id} 
            center={[t.lat, t.lng]} 
            radius={5} 
            // Add CSS animation class in pathOptions to make SVG circles pulse
            pathOptions={{ 
              color: '#00f2ff', 
              fillColor: '#00f2ff', 
              fillOpacity: 0.8,
              className: 'pulse-cyan-marker'
            }}
          >
            <Popup className="custom-popup">
              <div className="font-bold text-slate-800">Threat Detected</div>
              <div className="text-red-500 font-mono text-xs">{t.type}</div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default GlobalThreatMap;
