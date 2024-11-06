import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import "./ToolCatalog.css";
import ToolRequest from "./ToolRequest";
import PopUp from "../layouts/PopUp";

// Array of input configurations
const inputFields = [
    { label: "Name", type: "text", name: "name" },
    { label: "Size", type: "text", name: "size" },
    { label: "Availability", type: "text", name: "availability" },
    { label: "Image", type: "file", name: "image" },
];

function ToolCreator({ isVisible, onClose, onCreate }) {
    const inputRefs = useRef(inputFields.reduce((acc, field) => {
        acc[field.name] = React.createRef(); // Initialize a ref for each input field
        return acc;
    }, {}));

    // Submit tool
    const submitTool = async () => {
        const formData = new FormData();

        // Gather values from refs
        inputFields.forEach((field) => {
            const input = inputRefs.current[field.name].current;
            formData.append(field.name, field.type === "file" ? input.files[0] : input.value); // Handle file input
        });

        try {
            let response = await axios.post("http://127.0.0.1:5000/api/tools/create", formData);

            console.log("Tool created", response);
            onCreate();
        } catch (error) {
            console.error("Error creating tool");
        }

    };

    return (
        <PopUp isVisible={isVisible}>
            <table>
                <tbody>
                    {inputFields.map((field) => (
                        <tr key={field.name}>
                            <td>{field.label}</td>
                            <td>
                                <input
                                    type={field.type}
                                    name={field.name} // Use field name as input name
                                    ref={inputRefs.current[field.name]} // Attach ref to input
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={submitTool}>Submit</button>
            <button onClick={onClose}>Close</button>
        </PopUp>  
    );
}

function ToolDesc({ tool, isRequesting }) {
    return (
        <div className="card-container">
            <div className="card-header">
                <img
                    src={`data:image/jpeg;base64, ${tool.image}`}
                    width={150}
                />
            </div>
            <div className="card-content">
                <table>
                    <tbody>
                        <tr>
                            <td>Tool:</td>
                            <td>{tool.name}</td>
                        </tr>
                        <tr>
                            <td>Size:</td>
                            <td>{tool.size}</td>
                        </tr>
                        <tr>
                            <td>Available:</td>
                            <td>{tool.available}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <button className="footer-button" onClick={() => isRequesting(tool.name)}>Request</button>
            </div>
        </div>
    );
}

function ToolCatalog() {
    const [creating, setCreating] = useState(false);
    const [requesting, setRequesting] = useState("");
    const [tools, setTools] = useState([]);

    const fetchTools = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/api/tools/list");
            const tool_list = JSON.parse(response.data);
            setTools(tool_list);
        } catch (error) {
            console.error("Failure retrieving tool catalog");
        }
    };

    useEffect(() => {
        fetchTools();
    }, []);

    return (
        <div className="tool-catalog">
            <button
                className="create-tool-button"
                onClick={() => setCreating(true)}
            >
                +
            </button>
            <ToolCreator
                isVisible={creating}
                onClose={() => setCreating(false)}
                onCreate={fetchTools}
            />
            <ToolRequest
                isVisible={requesting != ""}
                toolName={requesting}
                onClose={() => setRequesting("")}
            />
            {tools.map((tool, index) => (
                <ToolDesc key={index} tool={tool} isRequesting={setRequesting}></ToolDesc>
            ))}
        </div>
    );
}

export default ToolCatalog;
