import React, { useRef } from "react";
import axios from "axios";
import "./ToolCreator.css";

// Array of input configurations
const inputFields = [
    { label: "Name", type: "text", name: "name" },
    { label: "Size", type: "text", name: "size" },
    { label: "Availability", type: "text", name: "availability" },
    { label: "Image", type: "file", name: "image" },
];

function ToolCreator({ isVisible, onClose }) {
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

export default ToolCreator;
