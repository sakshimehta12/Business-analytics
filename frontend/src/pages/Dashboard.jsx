import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie,
  LineChart, Line, Area,
  ResponsiveContainer
} from "recharts";

import { motion } from "framer-motion";
import PredictionChart from "../components/PredictionChart";
import "../index.css";
import API from "../api";

const Dashboard = () => {

  const [totalSales, setTotalSales] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [lowProducts, setLowProducts] = useState([]);

  useEffect(() => {
  fetch(`${API}/api/analytics/total-sales`)
    .then(res => res.json())
    .then(data => setTotalSales(data.totalSales));

  fetch(`${API}/api/analytics/sales-by-category`)
    .then(res => res.json())
    .then(setCategoryData);

  fetch(`${API}/api/analytics/sales-by-region`)
    .then(res => res.json())
    .then(setRegionData);

  fetch(`${API}/api/analytics/sales-trend`)
    .then(res => res.json())
    .then(setTrendData);

  fetch(`${API}/api/analytics/top-products`)
    .then(res => res.json())
    .then(setTopProducts);

  fetch(`${API}/api/analytics/low-products`)
    .then(res => res.json())
    .then(setLowProducts);
}, []);


  return (
    <div className="dashboard-wrapper">

      {/* LEFT SIDE */}
      <div className="dashboard-main">

        <div className="dashboard">

          {/* KPI */}
          <div className="kpi-container">

            <motion.div className="kpi-card" whileHover={{ scale: 1.03 }}>
              <h4>Total Revenue</h4>
              <p>₹ {Number(totalSales).toLocaleString()}</p>
              <span className="positive">Live data</span>
            </motion.div>

            <motion.div className="kpi-card" whileHover={{ scale: 1.03 }}>
              <h4>Categories</h4>
              <p>{categoryData.length}</p>
              <span className="neutral">Product diversity</span>
            </motion.div>

            <motion.div className="kpi-card" whileHover={{ scale: 1.03 }}>
              <h4>Regions</h4>
              <p>{regionData.length}</p>
              <span className="neutral">Market coverage</span>
            </motion.div>

          </div>

          {/* FORECAST */}
          <div className="chart-card full-width">
            <div className="chart-title">
              Sales Forecast & Trend
              <span className="chart-subtitle">
                Combined historical performance with predictive insights
              </span>
            </div>

            <PredictionChart />
          </div>

          {/* GRID */}
          <div className="chart-grid">

            {/* CATEGORY */}
            <div className="chart-card">
              <div className="chart-title">
                Category Performance
              </div>

              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={categoryData}
                  margin={{ top: 10, right: 20, left: 15, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#3B82F6" radius={[8,8,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* REGION */}
            <div className="chart-card">
              <div className="chart-title">
                Regional Distribution
              </div>

              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={regionData}
                    dataKey="sales"
                    nameKey="region"
                    outerRadius={90}
                    fill="#3B82F6"
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* TREND */}
            <div className="chart-card full-width">
              <div className="chart-title">
                Monthly Sales Trend
              </div>

              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={trendData}
                  margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>

                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />

                  <Line type="monotone" dataKey="sales" stroke="#2563EB" strokeWidth={3} />
                  <Area type="monotone" dataKey="sales" fill="url(#salesGradient)" />

                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* TOP PRODUCTS */}
            <div className="chart-card full-width">
              <div className="chart-title">Top Products</div>

              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product" hide />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#1E3A8A" radius={[6,6,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* LOW PRODUCTS */}
            <div className="chart-card full-width">
              <div className="chart-title">Low Performing Products</div>

              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {lowProducts.map((item, i) => (
                    <tr key={i}>
                      <td>{item.product}</td>
                      <td>₹ {item.sales.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>

      {/* RIGHT PANEL (FIXED) */}
        <motion.div 
      className="insight-panel"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* INSIGHTS */}
      <div className="panel-section">
        <h3>💡 Key Insights</h3>

        <div className="panel-card insight">
          <div className="panel-title">Technology Dominance</div>
          <div className="panel-desc">
            Technology category contributes the highest revenue share.
          </div>
          <span className="panel-tag positive">High Impact</span>
        </div>

        <div className="panel-card insight">
          <div className="panel-title">Upward Trend</div>
          <div className="panel-desc">
            Sales show strong growth in later months.
          </div>
          <span className="panel-tag positive">Growth</span>
        </div>
      </div>

      {/* WARNINGS */}
      <div className="panel-section">
        <h3>⚠️ Warnings</h3>

        <div className="panel-card warning">
          <div className="panel-title">Low Performers</div>
          <div className="panel-desc">
            Several products consistently generate low revenue.
          </div>
          <span className="panel-tag warning">Needs Attention</span>
        </div>

        <div className="panel-card warning">
          <div className="panel-title">Revenue Concentration</div>
          <div className="panel-desc">
            Majority revenue depends on few products.
          </div>
          <span className="panel-tag warning">Risk</span>
        </div>
      </div>

      {/* OPPORTUNITIES */}
      <div className="panel-section">
        <h3>🚀 Opportunities</h3>

        <div className="panel-card opportunity">
          <div className="panel-title">Expand Winners</div>
          <div className="panel-desc">
            Invest more in high-performing categories.
          </div>
          <span className="panel-tag opportunity">High ROI</span>
        </div>

        <div className="panel-card opportunity">
          <div className="panel-title">Optimize Products</div>
          <div className="panel-desc">
            Improve or reposition low-performing items.
          </div>
          <span className="panel-tag opportunity">Actionable</span>
        </div>
      </div>

    </motion.div>

    </div>
  );
};

export default Dashboard;