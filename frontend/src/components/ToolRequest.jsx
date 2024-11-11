import axios from "axios";
import PopUp from "../layouts/PopUp";
import FactoryMap from "./FactoryMap";

function ToolRequest({ isVisible, toolName, onClose }) {
    let coordinates = [0,0];

    const setCoords = (coords) => {
        coordinates = [coords[0], coords[1]];
    }

    const sendCoords = async () => {
        console.log("Requesting");
        try {
            await axios.post(
                "http://127.0.0.1:5000/api/map/goal", 
                coordinates
            );
        } catch (err) {
            console.log("Error fetching image");
        }
    }

    return (
        <PopUp isVisible={isVisible}>
            <h1>Requesting {toolName}</h1>
            <FactoryMap currCoordinates={setCoords}/>
            <button onClick={onClose}>Close</button>
            <button onClick={sendCoords}>Request</button>
        </PopUp>
    );
}

export default ToolRequest;