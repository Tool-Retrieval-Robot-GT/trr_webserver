import { MapContainer, ImageOverlay, Marker } from 'react-leaflet';
import L from 'leaflet';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

function FactoryMap() {
    const [image, setImage] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                let response = await axios.get(
                    "http://127.0.0.1:5000/api/test/map"
                );
                setImage(response.data);
            } catch (err) {
                console.log("Error fetching image");
            }
        };

        fetchImage();
    }, []);

    const bounds = [
        [0, 0], // Top-left corner (lat/lng)
        [image == null ? 0 : image.height, image == null ? 0 : image.width], // Bottom-right corner (lat/lng)
    ];

    const pixelToLatLng = (x, y) => {
        if (image == null) {
            return;
        }
        // Converts pixel coordinates to LatLng based on the bounds
        const imageWidth = image.width;
        const imageHeight = image.height;

        // Image bounds in Lat/Lng
        const topLeft = L.latLng(0, image.width); // Top-left lat/lng
        const bottomRight = L.latLng(image.height, 0); // Bottom-right lat/lng

        // Calculate the difference in latitudes and longitudes
        const latDiff = bottomRight.lat - topLeft.lat;
        const lonDiff = bottomRight.lng - topLeft.lng;

        // Calculate the percentage of the way through the image coordinates
        const lat = topLeft.lat + (y / imageHeight) * latDiff;
        const lon = topLeft.lng + (x / imageWidth) * lonDiff;

        return L.latLng(lat, lon);
    };

    // Example waypoints in pixel coordinates
    const waypoints = [
        { id: 1, position: [351, 181], latlon: pixelToLatLng(351, 181) },
        { id: 2, position: [142, 419], latlon: pixelToLatLng(142, 419) },
    ];

    const handleMarkerClick = (id) => {
        console.log("Clicked");
        setSelectedMarker(id);
    };

    return (
        <>
            {image == null ? (
                <h1>Fetching image</h1>
            ) : (
                <MapContainer
                    center={[image.height / 2, image.width / 2]}
                    zoom={0}
                    style={{
                        height: `${image.height}px`,
                        width: `${image.width}px`,
                    }}
                    crs={L.CRS.Simple}
                    maxBounds={bounds}
                    maxBoundsViscosity={1.0}
                >
                    <ImageOverlay
                        url={`data:image/png;base64,${image.img}`}
                        bounds={bounds}
                    />
                    {waypoints.map((waypoint) => (
                        <Marker
                        key={waypoint.id}
                        position={waypoint.latlon}
                        icon={selectedMarker === waypoint.id ? L.icon({ 
                            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41]
                        }) : L.icon({
                            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41]
                        })}
                        eventHandlers={{
                            click: () => handleMarkerClick(waypoint.id),
                        }}
                    />
                    ))}
                </MapContainer>
            )}
        </>
    );
}

export default FactoryMap;
