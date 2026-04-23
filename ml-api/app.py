import pandas as pd
from sklearn.linear_model import LinearRegression
from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# ✅ Load dataset (FIXED PATH)
DATA_PATH = os.path.join(os.path.dirname(__file__), "Superstore.csv")
df = pd.read_csv(DATA_PATH)

# ✅ Preprocess
df['Order Date'] = pd.to_datetime(df['Order Date'])
df['Month'] = df['Order Date'].dt.month
df['Sales'] = pd.to_numeric(df['Sales'], errors='coerce')
df = df.dropna(subset=['Sales'])

# ✅ Group by month
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
        months = list(range(1, 13))
        future_months = [1, 2, 3]

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

# ✅ Run server (IMPORTANT for Render)
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)