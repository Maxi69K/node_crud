const express = require('express');
const fs = require('fs');
const app = express();
let db = [];

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/js'));

app.get('/', (req, res) => {
  db = require('./phone.json');
  res.render('index', {phone: db});
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.get('/edit-delete', (req, res) => {
  db = require('./phone.json');
  res.render('edit-delete', {phone: db});
});

app.get('/edit/:id', (req, res) => {
  db = require('./phone.json');
  let phone = db.find((el) => el.id === parseInt(req.params.id))
  res.render('edit', {phone});
});

app.post('/edit', (req, res) => {
  let id = parseInt(req.body.id);
  db = require('./phone.json');
  let foundIndex = null;
  db.find((el, index) => {
    if (el.id === id) {
      foundIndex = index;
      return;
    }
  });
  db[foundIndex] = req.body;
  fs.writeFileSync('phone.json', JSON.stringify(db));
  res.send('OK');
});

app.delete('/edit-delete/:id', (req, res) => {
  db = require('./phone.json');
  let id = parseInt(req.params.id);
  let new_db = db.filter((el) => el.id !== id)
  fs.writeFileSync('phone.json', JSON.stringify(new_db));
  res.status(205).send('OK');
});

app.put('/add', (req, res) => {
  //console.log(req.body); // Ovde dolaze podaci iz forme add.ejs
  let phone = {...req.body};
  //let phone = Object.assign(req.body); // ovo je isto kao ovo iznad
  db = require('./phone.json');
  phone.id = db.length
  db.push(phone);
  fs.writeFileSync('phone.json', JSON.stringify(db));
  res.send('OK');
});

app.listen(3000,() => {
    console.log('Server running ...');
})