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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/analytics/sales-trend`)
        .then(res => res.json())
        .catch(() => []),

      fetch(`${API}/predict-trend`)
        .then(res => res.json())
        .catch(() => ({ months: [], predictions: [] }))
    ])
    .then(([actualData, predictedData]) => {

      // 🛡️ Safety checks
      if (!Array.isArray(actualData)) actualData = [];
      if (!predictedData || !Array.isArray(predictedData.months)) {
        predictedData = { months: [], predictions: [] };
      }

      const actualMap = {};
      actualData.forEach(item => {
        if (item && item.month !== undefined) {
          actualMap[Number(item.month)] = item.sales || 0;
        }
      });

      const combined = predictedData.months.map((month, index) => ({
        month,
        actual: actualMap[month] ?? null,
        predicted: predictedData.predictions?.[index] ?? null
      }));

      setData(combined);
      setLoading(false);
    })
    .catch(err => {
      console.error("PredictionChart error:", err);
      setData([]);
      setLoading(false);
    });
  }, []);

  return (
    <div className="chart-card">
      <div className="chart-title">📈 Sales Trend & Forecast</div>

      {loading ? (
        <div style={{ padding: "20px" }}>Loading chart...</div>
      ) : data.length === 0 ? (
        <div style={{ padding: "20px" }}>
          No data available (check backend connection)
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >

            {/* Prediction zone */}
            <ReferenceArea
              x1={12}
              x2={15}
              strokeOpacity={0}
              fill="#fce7f3"
              fillOpacity={0.4}
            />

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
              formatter={(value) =>
                value ? `₹ ${Number(value).toLocaleString()}` : "-"
              }
            />

            <Legend />

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
      )}

      <div className="chart-insight success">
        💡 Forecast indicates stable growth trend in upcoming months
      </div>
    </div>
  );
};

export default PredictionChart;