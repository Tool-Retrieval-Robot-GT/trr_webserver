import { useState } from "react";

import ToolDesc from "./ToolDesc";
import ToolCreator from "./ToolCreator"
import "./ToolCatalog.css";
import BaseLayout from "../layouts/BaseLayout";
;

function ToolCatalog() {
    const [creating, setCreating] = useState(false);

    return (
        <BaseLayout>
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
        </BaseLayout>
    );
}

export default ToolCatalog;