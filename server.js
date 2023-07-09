const express = require('express');
const app = express();
let db = [];

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/js'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.put('/add', (req, res) => {
  //console.log(req.body); // Ovde dolaze podaci iz forme add.ejs
  db.push(req.body);
  res.send('OK');
});

app.listen(3000,() => {
    console.log('Server running ...');
})