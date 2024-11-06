import './PopUp.css';

function PopUp({ children, isVisible }) {
    return (
        <>
            <div className={`popup-overlay ${isVisible ? "visible" : ""}`}></div>

            <div className={`popup-content ${isVisible ? "visible" : ""}`}>
                {children}
            </div>
        </>
    );
}

export default PopUp;