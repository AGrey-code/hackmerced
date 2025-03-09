require('dotenv').config(); // if you want environment variables
const express = require('express');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parse/sync'); // for parsing CSV in Node

const app = express();
const port = 3000;

// Set EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// parse form data
app.use(express.urlencoded({ extended: true }));

// serve static from 'public' if needed
app.use(express.static('public'));

// GET / => show home.ejs
app.get('/', (req, res) => {
  res.render('home');
});

// GET /input => form page
app.get('/input', (req, res) => {
  res.render('input');
});

// POST /submit => read user input, do CSV analysis, show recommendation
app.post('/submit', (req, res) => {
  const { Location, distance, Budget, Price } = req.body;

  // 1) run naive analysis on CSV
  //    e.g. filter rows by "median_house_value <= Price"
  const recommendation = analyzeCSV(Price); // pass user Price or other logic

  // 2) display result
  //    we include the recommended lat, lon, and recommended "houseValue"
  res.send(`
    <h2>Form Submitted & Analysis Complete</h2>
    <p><strong>Location Input:</strong> ${Location}</p>
    <p><strong>Distance:</strong> ${distance}</p>
    <p><strong>Budget:</strong> ${Budget}</p>
    <p><strong>Price:</strong> ${Price}</p>
    <hr/>
    <h3>CSV Analysis Recommendation</h3>
    <p>Recommended latitude: ${recommendation.lat}</p>
    <p>Recommended longitude: ${recommendation.lon}</p>
    <p>Recommended house value: $${recommendation.houseValue}</p>
    <p>...other data if needed...</p>
    <hr/>
    <p><a href="/">Back Home</a></p>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

/**
 * Reads local CSV (housing.csv), does a naive filter "median_house_value <= userPrice",
 * returns the first match's lat, lon, and houseValue as an object.
 */
function analyzeCSV(userPrice) {
  const csvPath = path.join(__dirname, 'data', 'housing.csv');
  
  const raw = fs.readFileSync(csvPath, 'utf8');

  const records = csv.parse(raw, {
    columns: true, 
    skip_empty_lines: true
  });

  const subset = records.filter(r => {
    const val = parseFloat(r.median_house_value);
    return val <= userPrice;
  });

  if (subset.length === 0) {
    return {
      lat: 'N/A',
      lon: 'N/A',
      houseValue: 'No suitable house found'
    };
  }

  const row = subset[0];

  return {
    lat: row.latitude,
    lon: row.longitude,
    houseValue: row.median_house_value
  };
}