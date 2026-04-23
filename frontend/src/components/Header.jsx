import API from "../api";

const Header = () => {

  const handleDownload = () => {
  window.open(`${API}/api/analytics/export`, "_blank");
  };

  return (
    <div className="header">

      <div className="dashboard-header">
        <h1 className="dashboard-title">Business Analytics Dashboard</h1>
        <p className="dashboard-subtitle">
          Real-time insights, predictions, and growth analytics
        </p>
      </div>

      <button className="export-btn" onClick={handleDownload}>
        ⬇ Export Dataset
      </button>

    </div>
  );
};

export default Header;