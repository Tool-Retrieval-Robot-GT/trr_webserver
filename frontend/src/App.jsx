import { useEffect, useState } from 'react';
import axios from 'axios'
import { MapContainer, ImageOverlay} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

import './App.css'


function App() {
  const [image, setImage] = useState(null);

  const bounds = [
    [0, 0],    // Top-left corner (lat/lng)
    [500, 500] // Bottom-right corner (lat/lng)
  ];

  useEffect(() => {
    const fetchImage = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/test/hello");
        setImage(response.data);
      } catch (err) {
        console.log("Error fetching image");
      }
    }

    fetchImage();
  }, []);

  return (
    <div>
      <img src={`data:image/png;base64,${image}`} width={500}></img>
      <MapContainer
      center={[250, 250]}  // Set initial center within bounds
      zoom={1}             // Zoom level to fit the image nicely
      style={{ height: '500px', width: '500px' }} // Use a simple coordinate system for the image
      crs={L.CRS.Simple} >   
        <ImageOverlay url={`data:image/png;base64,${image}`} bounds={bounds} />
      </MapContainer>,
    </div>
  );
}

export default App
