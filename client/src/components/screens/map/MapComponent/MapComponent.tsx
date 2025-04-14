import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { useSubdivisions } from '../../../../hooks/useSubdivisions';

interface IMarker {
  id: number;
  position: LatLngExpression;
  description: string;
}

function MapComponent() {
  const [center] = useState<LatLngExpression>([56.2965, 43.9361]);
  const [zoom] = useState<number>(10);
  const navigate = useNavigate(); 
  const { loading, error, subdiv } = useSubdivisions();

  const handleMarkerClick = (id: number) => {
    navigate(`/dashboard/subdivisions/${id}`)
  };

  if (loading) {
    return <p>Загрузка данных...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Ошибка: {error}</p>;
  }

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '600px', width: '600px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {subdiv.map((item) => (
        <Marker
              key={item.subdiv_id}
              position={item.subdiv_position as LatLngExpression}
              eventHandlers={{
              click: () => handleMarkerClick(item.subdiv_id),
              mouseover: (e) => {
                e.target.openPopup();
              },
              mouseout: (e) => {
                e.target.closePopup();
              },
            }}
          >
          <Popup>
            <span>{item.subdiv_name}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
