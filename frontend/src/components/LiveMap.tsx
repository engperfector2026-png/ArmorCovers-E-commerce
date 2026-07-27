import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';

function LiveMap({ orderId, riderLocation }: { orderId: string; riderLocation: any }) {
  const [position, setPosition] = useState<[number, number]>([ -1.2921, 36.8219 ]); // Nairobi default

  useEffect(() => {
    if (riderLocation) {
      setPosition([riderLocation.lat, riderLocation.lng]);
    }
  }, [riderLocation]);

  return (
    <MapContainer center={position} zoom={15} style={{ height: "400px", borderRadius: "16px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Rider is here! <br /> Order #{orderId}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default LiveMap;