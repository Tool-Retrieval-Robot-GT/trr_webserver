import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, ImageOverlay } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

function FactoryMap() {
    const [image, setImage] = useState(null);

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

    return (
        <>
            {image == null ? (
                <h1>Fetching image</h1>
            ) : (
                <MapContainer
                    center={[image.height / 2, image.width / 2]} // Set initial center within bounds
                    zoom={0} // Zoom level to fit the image nicely
                    style={{
                        height: `${image.height}px`,
                        width: `${image.width}px`,
                    }}
                    crs={L.CRS.Simple}
                    maxBounds={bounds} // Restrict map to image bounds
                    maxBoundsViscosity={1.0} // Fully restrict panning outside bounds
                >
                    <ImageOverlay
                        url={`data:image/png;base64,${image.img}`}
                        bounds={bounds}
                    />
                </MapContainer>
            )}
        </>
    );
}

export default FactoryMap;
