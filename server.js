const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

//app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render("home")
})

app.get('/input', (req, res) => {
    res.render("input")
})


/*app.post('/submit', (req, res) => {
    const { Location, distance, Distance, Price } = req.body;

    res.send(
        <h2>  </h2>
        <h2>  </h2>
        <h2>  </h2>
        <h2>  </h2>
        <h2>  </h2>
    )
});*/
  
app.listen(port)