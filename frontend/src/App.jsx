import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Warnings from "./pages/Warnings";
import Opportunities from "./pages/Opportunities";
import DataExplorer from "./pages/DataExplorer";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", background: "#F8FAFC" }}>
        <Sidebar />

         <div style={{marginLeft: "300px", width: "100%" }}>
          <Header />

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/warnings" element={<Warnings />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/data" element={<DataExplorer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;