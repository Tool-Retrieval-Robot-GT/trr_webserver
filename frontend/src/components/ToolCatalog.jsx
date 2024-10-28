import { useState } from "react";

import ToolDesc from "./ToolDesc";
import ToolCreator from "./ToolCreator"
import "./ToolCatalog.css";
;

function ToolCatalog() {
    const [creating, setCreating] = useState(false);

    return (
        <div className="tool-catalog">
            <button className="create-tool-button" onClick={() => setCreating(true)}>+</button>
            <ToolCreator isVisible={creating} onClose={() => setCreating(false)}></ToolCreator>
            <ToolDesc></ToolDesc>
            <ToolDesc></ToolDesc>
            <ToolDesc></ToolDesc>
            <ToolDesc></ToolDesc>
            <ToolDesc></ToolDesc>
            <ToolDesc></ToolDesc>
            <ToolDesc></ToolDesc>
        </div>
    );
}

export default ToolCatalog;