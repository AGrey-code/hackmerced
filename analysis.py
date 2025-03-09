import sys
import os
import pandas as pd

def main():
    # Check arguments
    if len(sys.argv) < 4:
        print("Usage: python analysis.py <distance> <Budget> <Price>")
        sys.exit(1)

    distance = float(sys.argv[1])
    budget   = float(sys.argv[2])
    price    = float(sys.argv[3])

    # CSV file path, relative to this script or absolute path
    csv_path = os.path.join(os.path.dirname(__file__), 'data', 'housing.csv')
    if not os.path.exists(csv_path):
        print("Error: CSV not found at", csv_path)
        sys.exit(1)

    # Load data with pandas
    df = pd.read_csv(csv_path)

    # [Naive Example] Filter rows where median_house_value <= price
    subset = df[df["median_house_value"] <= price]
    if subset.empty:
        print("No matches found for your Price.")
        sys.exit(0)

    # For demonstration, pick the first row as a "recommendation"
    rec = subset.iloc[0]

    # Print to stdout the result
    print(f"Recommended row => lat={rec['latitude']}, lon={rec['longitude']}, median_value={rec['median_house_value']}")

if __name__ == "__main__":
    main()