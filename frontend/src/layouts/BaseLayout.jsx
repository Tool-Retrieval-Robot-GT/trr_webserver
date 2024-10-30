import './BaseLayout.css'

import Navbar from '../components/Navbar';

function BaseLayout({ children }) {
    return (
        <div className="base-layout">
            <Navbar/>
            <main className="base-content">{children}</main>
        </div>
    );
}

export default BaseLayout;