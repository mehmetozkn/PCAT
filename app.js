const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const { response } = require('express');
const Photo = require('./models/Photo.js');

const app = express();

mongoose.connect('mongodb://localhost/pcat-test-db');

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;

app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  // console.log(req.params.id);
  //  res.render('about');
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo
  })
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
