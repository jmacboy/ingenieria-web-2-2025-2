import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { Card } from "react-bootstrap";

const MapMarker = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const centerPosition = { lat: -17.7691363, lng: -63.1852039 };
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    return (
        <>
            <div style={{ height: '100vh' }}>
                <APIProvider apiKey={apiKey}>
                    <Map center={centerPosition} zoom={10} onClick={(e) => {
                        console.log(e.detail.latLng);
                        setLatitude(e.detail.latLng.lat);
                        setLongitude(e.detail.latLng.lng);
                    }}>
                        {latitude && longitude && (
                            <Marker position={{
                                lat: latitude,
                                lng: longitude
                            }} />
                        )}
                        <Card style={{ position: 'absolute', left: '20px', bottom: '20px' }}>
                            <Card.Body>
                                Hola Mundo
                            </Card.Body>
                        </Card>
                    </Map>
                </APIProvider>
            </div>
        </>
    );
}

export default MapMarker;