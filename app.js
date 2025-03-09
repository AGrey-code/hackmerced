const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/input', (req, res) => {
  res.render('input');
});

app.post('/submit', (req, res) => {
  const { Location, distance, Budget, Price } = req.body;

  res.send(`
    <h2>Form Submitted</h2>
    <p>Location: ${Location}</p>
    <p>Distance: ${distance}</p>
    <p>Budget: ${Budget}</p>
    <p>Price: ${Price}</p>
    <p><a href="/">Back home</a></p>
  `);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});