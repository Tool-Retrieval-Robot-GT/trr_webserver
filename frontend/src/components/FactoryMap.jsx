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
                    "http://127.0.0.1:5000/api/test/hello"
                );
                setImage(response.data);
            } catch (err) {
                console.log("Error fetching image");
            }
        };

        fetchImage();
    }, []);

    if (image == null) {
        return <h1>Fetching image</h1>;
    }

    const bounds = [
        [0, 0], // Top-left corner (lat/lng)
        [image.height, image.width], // Bottom-right corner (lat/lng)
    ];

    return (
        <MapContainer
            center={[image.height / 2, image.width / 2]} // Set initial center within bounds
            zoom={0} // Zoom level to fit the image nicely
            style={{ height: `${image.height}px`, width: `${image.width}px` }} // Use a simple coordinate system for the image
            crs={L.CRS.Simple}
        >
            <ImageOverlay
                url={`data:image/png;base64,${image.img}`}
                bounds={bounds}
            />
        </MapContainer>
    );
}

export default FactoryMap;
