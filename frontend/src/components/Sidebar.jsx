import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>Analytics</h2>
      </div>

      <nav className="nav-links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/insights">Insights</NavLink>
        <NavLink to="/warnings">Warnings</NavLink>
        <NavLink to="/opportunities">Opportunities</NavLink>
        <NavLink to="/data">Data Explorer</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;