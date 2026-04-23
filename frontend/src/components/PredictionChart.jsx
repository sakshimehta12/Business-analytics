import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  ReferenceArea
} from "recharts";
import API from "../api";

const PredictionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
  Promise.all([
    fetch(`${API}/api/analytics/sales-trend`).then(res => res.json()),
    fetch(`${API}/predict-trend`).then(res => res.json())
  ])
  .then(([actualData, predictedData]) => {

      const actualMap = {};
      actualData.forEach(item => {
        actualMap[Number(item.month)] = item.sales;
      });

      const combined = predictedData.months.map((month, index) => ({
        month,
        actual: actualMap[month] || null,
        predicted: predictedData.predictions[index]
      }));

      setData(combined);
    });
  }, []);

  return (
    <div className="chart-card">
      <div className="chart-title">📈 Sales Trend & Forecast</div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}
        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>

          {/* 🔥 Highlight prediction zone */}
          <ReferenceArea
            x1={12}
            x2={15}
            strokeOpacity={0}
            fill="#fce7f3"
            fillOpacity={0.4}
          />

          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          {/* Axes */}
          <XAxis dataKey="month"/>
          <YAxis/>

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
            }}
            formatter={(value) => `₹ ${Number(value).toLocaleString()}`}
          />

          <Legend />

          {/* 🔵 ACTUAL */}
          <Line
            type="monotone"
            dataKey="actual"
            name="Actual Sales"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            animationDuration={800}
          />

          {/* 🟣 PREDICTED */}
          <Line
            type="monotone"
            dataKey="predicted"
            name="Forecast"
            stroke="#ec4899"
            strokeWidth={3}
            strokeDasharray="6 6"
            dot={false}
            animationDuration={800}
          />

        </LineChart>
      </ResponsiveContainer>

      {/* 🔥 Insight below chart */}
      <div className="chart-insight success">
        💡 Forecast indicates stable growth trend in upcoming months
      </div>
    </div>
  );
};

export default PredictionChart;