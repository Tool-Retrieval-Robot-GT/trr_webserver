import React from 'react';
import './ToolCreator.css'; // Make sure to import your CSS file

function ToolCreator({ isVisible }) {
    return (
        <div className={`tool-creator ${isVisible ? 'visible' : ''}`}>
            HELLO I AM THE TOOL CREATOR
        </div>
    );
}

export default ToolCreator;
