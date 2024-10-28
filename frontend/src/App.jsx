import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css'
import Navbar from './components/Navbar';
import FactoryMap from './components/FactoryMap'
import ToolCatalog from './components/ToolCatalog'

function App() {
  return (
    <Router>
      <div>
          <Navbar/>
          <Routes>
              <Route path="/" element={<h1>Homepage</h1>} />
              <Route path="/map" element={<FactoryMap />} />
              <Route path="/catalog" element={<ToolCatalog />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App
