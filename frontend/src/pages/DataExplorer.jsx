import { useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";

const DataExplorer = () => {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/analytics/all-data")
      .then(res => res.json())
      .then(setData);
  }, []);

  // 🔍 FILTER LOGIC
  const filteredData = data.filter(row =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <PageLayout
      title="Data Explorer"
      subtitle="Explore and analyze your dataset interactively"
    >

      {/* SEARCH BAR */}
      <div className="data-controls">
        <input
          type="text"
          placeholder="Search anything (product, category, region...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Region</th>
              <th>Sales</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, i) => (
              <tr key={i}>
                <td>{row["Order ID"]}</td>
                <td>{row["Product Name"]}</td>
                <td>{row["Category"]}</td>
                <td>{row["Region"]}</td>
                <td>₹ {row["Sales"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </PageLayout>
  );
};

export default DataExplorer;