import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

interface IMarker {
  id: number;
  position: LatLngExpression;
  description: string;
}

function MapComponent() {
  const [center] = useState<LatLngExpression>([56.2965, 43.9361]);
  const [zoom] = useState<number>(10);
  const navigate = useNavigate(); // Хук для навигации

  const markers: IMarker[] = [
    { id: 1, position: [56.16972998704834, 44.19803185756923], description: 'Компания GRNU' },
    { id: 2, position: [56.314876338684925, 44.003520566551366], description: 'Компания Transneft' },
  ];

  const handleMarkerClick = (id: number) => {
    navigate(`/dashboard/subdivisions/${id}`)
  };

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '600px', width: '600px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {markers.map((marker) => (
        
        <Marker
          key={marker.id}
          position={marker.position}
          eventHandlers={{
            click: () => handleMarkerClick(marker.id),
            mouseover: (e) => {
              e.target.openPopup();
            },
            mouseout: (e) => {
              e.target.closePopup();
            },
          }}
        >
          {marker.description ? (
              <Popup>
                <span>{marker.description}</span>
              </Popup>
            ) : null}
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
