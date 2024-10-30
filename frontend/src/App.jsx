import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css'
import BaseLayout from "./layouts/BaseLayout";
import FactoryMap from './components/FactoryMap'
import ToolCatalog from './components/ToolCatalog'

function App() {
  return (
    <Router>
      <div>
          <Routes>
              <Route path="/" element={<BaseLayout><h1>Homepage</h1></BaseLayout>} />
              <Route path="/map" element={<FactoryMap />} />
              <Route path="/catalog" element={<ToolCatalog />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App
