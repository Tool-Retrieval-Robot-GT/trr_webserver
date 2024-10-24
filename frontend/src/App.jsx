import { useEffect, useState } from 'react';
import axios from 'axios'

import './App.css'


function App() {
  const [image, setImage] = useState(null)

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
    </div>
  );
}

export default App
