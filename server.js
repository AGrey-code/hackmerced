const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("home")
})

app.get('/input', (req, res) => {
    res.render("input")
})
  
app.listen(port)