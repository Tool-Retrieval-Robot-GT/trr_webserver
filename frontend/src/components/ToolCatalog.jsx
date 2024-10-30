import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import "./ToolCatalog.css";
import BaseLayout from "../layouts/BaseLayout";

// Array of input configurations
const inputFields = [
    { label: "Name", type: "text", name: "name" },
    { label: "Size", type: "text", name: "size" },
    { label: "Availability", type: "text", name: "availability" },
    { label: "Image", type: "file", name: "image" },
];

function ToolCreator({ isVisible, onClose, onCreate }) {
    // Create refs for each input
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
        <>
            {/* Backdrop overlay */}
            <div className={`overlay ${isVisible ? "visible" : ""}`}></div>

            {/* Tool Creator window */}
            <div className={`tool-creator ${isVisible ? "visible" : ""}`}>
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
            </div>
        </>
    );
}

function ToolDesc({ tool }) {
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
                <button className="footer-button">Request</button>
            </div>
        </div>
    );
}

function ToolCatalog() {
    const [creating, setCreating] = useState(false);
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
        <BaseLayout>
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
                ></ToolCreator>
                {tools.map((tool, index) => (
                    <ToolDesc key={index} tool={tool}></ToolDesc>
                ))}
            </div>
        </BaseLayout>
    );
}

export default ToolCatalog;
