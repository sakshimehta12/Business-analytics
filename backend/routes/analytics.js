const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const getCollection = () =>
  mongoose.connection.useDb("project-analytics").collection("Superstore-data");


// 1. TOTAL SALES KPI
router.get("/total-sales", async (req, res) => {
  try {
    const data = await getCollection().find({}).toArray();

    const total = data.reduce((sum, row) => {
      const value = parseFloat(row.Sales || row.sales || 0);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);

    res.json({ totalSales: total.toFixed(2) });

  } catch (err) {
    console.error("Error in total-sales:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 2. SALES BY CATEGORY (Bar Chart)
router.get("/sales-by-category", async (req, res) => {
  const data = await getCollection().find({}).toArray();

  const result = {};

  data.forEach(row => {
    const category = row.Category;
    const sales = parseFloat(row.Sales);

    result[category] = (result[category] || 0) + sales;
  });

  const formatted = Object.keys(result).map(key => ({
    category: key,
    sales: result[key]
  }));

  res.json(formatted);
});


// 3. SALES BY REGION (Pie Chart)
router.get("/sales-by-region", async (req, res) => {
  const data = await getCollection().find({}).toArray();

  const result = {};

  data.forEach(row => {
    const region = row.Region;
    const sales = parseFloat(row.Sales);

    result[region] = (result[region] || 0) + sales;
  });

  const formatted = Object.keys(result).map(key => ({
    region: key,
    sales: result[key]
  }));

  res.json(formatted);
});


// 4. MONTHLY SALES TREND (Line Chart)
router.get("/sales-trend", async (req, res) => {
  const data = await getCollection().find({}).toArray();

  const result = {};

  data.forEach(row => {
    const date = new Date(row["Order Date"]);
    const month = date.getMonth() + 1;

    const sales = parseFloat(row.Sales);

    result[month] = (result[month] || 0) + sales;
  });

  const formatted = Object.keys(result).map(key => ({
    month: key,
    sales: result[key]
  }));

  res.json(formatted);
});

router.get("/top-products", async (req, res) => {
  const data = await getCollection().find({}).toArray();

  const productSales = {};

  data.forEach(row => {
    const product = row["Product Name"];
    const sales = parseFloat(row.Sales);

    productSales[product] = (productSales[product] || 0) + sales;
  });

  const sorted = Object.keys(productSales)
    .map(name => ({
      product: name,
      sales: productSales[name]
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 10);

  res.json(sorted);
});

router.get("/low-products", async (req, res) => {
 const data = await getCollection().find({}).toArray();

  const productSales = {};

  data.forEach(row => {
    const product = row["Product Name"];
    const sales = parseFloat(row.Sales);

    productSales[product] = (productSales[product] || 0) + sales;
  });

  const sorted = Object.keys(productSales)
    .map(name => ({
      product: name,
      sales: productSales[name]
    }))
    .sort((a, b) => a.sales - b.sales)
    .slice(0, 10);

  res.json(sorted);
});

router.get("/all-data", async (req, res) => {
  const data = await getCollection().find({}).toArray();
  res.json(data.slice(0, 50)); 
});

// 7. EXPORT FULL DATA AS CSV
router.get("/export", async (req, res) => {
  try {
    const data = await getCollection().find({}).toArray();

    if (!data.length) {
      return res.status(404).send("No data found");
    }

    // Remove _id field (optional but cleaner)
    const cleanedData = data.map(({ _id, ...rest }) => rest);

    // Create headers
    const headers = Object.keys(cleanedData[0]).join(",");

    // Create rows
    const rows = cleanedData.map(obj =>
      Object.values(obj)
        .map(val => `"${val}"`)
        .join(",")
    );

    const csv = [headers, ...rows].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=superstore_data.csv"
    );

    res.send(csv);

  } catch (err) {
    console.error("Export Error:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;