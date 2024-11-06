import PopUp from "../layouts/PopUp";
import FactoryMap from "./FactoryMap";

function ToolRequest({ isVisible, toolName, onClose }) {
    return (
        <PopUp isVisible={isVisible}>
            <h1>Requesting {toolName}</h1>
            <FactoryMap />
            <button onClick={onClose}>Close</button>
        </PopUp>
    );
}

export default ToolRequest;