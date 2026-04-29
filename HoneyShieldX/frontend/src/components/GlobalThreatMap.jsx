import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
