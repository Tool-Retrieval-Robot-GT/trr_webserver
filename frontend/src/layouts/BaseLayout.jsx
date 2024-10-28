import './BaseLayout.css'

function BaseLayout({ children }) {
    return (
        <div className="base-layout">
            <main className="base-content">{children}</main>
        </div>
    );
}

export default BaseLayout;