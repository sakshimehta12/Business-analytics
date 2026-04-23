import pandas as pd
from sklearn.linear_model import LinearRegression
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ✅ Load dataset
df = pd.read_csv("../backend/data/Superstore.csv")

# ✅ Preprocess
df['Order Date'] = pd.to_datetime(df['Order Date'])
df['Month'] = df['Order Date'].dt.month

# Ensure Sales is numeric
df['Sales'] = pd.to_numeric(df['Sales'], errors='coerce')
df = df.dropna(subset=['Sales'])

# Features & target
X = df[['Month']]
y = df['Sales']

# ✅ Train modelimport pandas as pd
from sklearn.linear_model import LinearRegression
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ✅ Load dataset
df = pd.read_csv("../backend/data/Superstore.csv")

# ✅ Preprocess
df['Order Date'] = pd.to_datetime(df['Order Date'])
df['Month'] = df['Order Date'].dt.month

# Ensure Sales is numeric
df['Sales'] = pd.to_numeric(df['Sales'], errors='coerce')
df = df.dropna(subset=['Sales'])

# 🔥 IMPORTANT FIX: GROUP BY MONTH
monthly_sales = df.groupby('Month')['Sales'].sum().reset_index()

# Features & target
X = monthly_sales[['Month']]
y = monthly_sales['Sales']

# ✅ Train model
model = LinearRegression()
model.fit(X, y)

# ✅ Prediction API
@app.route('/predict-trend', methods=['GET'])
def predict_trend():
    try:
        # Past months (actual range)
        months = list(range(1, 13))

        # Future months (continuation)
        future_months = [1,2,3]

        all_months = months + future_months

        input_df = pd.DataFrame(all_months, columns=["Month"])
        predictions = model.predict(input_df)

        return jsonify({
            "months": all_months,
            "predictions": predictions.tolist()
        })

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Prediction failed"}), 500


# ✅ Run server
if __name__ == "__main__":
    app.run(port=5001, debug=True)
model = LinearRegression()
model.fit(X, y)

# ✅ Prediction API
@app.route('/predict-trend', methods=['GET'])
def predict_trend():
    try:
        # Past months
        months = list(range(1, 13))

        # Future months
        future_months = [1,2,3]

        all_months = months + future_months

        input_df = pd.DataFrame(all_months, columns=["Month"])
        predictions = model.predict(input_df)

        return jsonify({
            "months": all_months,
            "predictions": predictions.tolist()
        })

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Prediction failed"}), 500

# ✅ Run server
if __name__ == "__main__":
    app.run(port=5001, debug=True)