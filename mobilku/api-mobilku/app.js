var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mobilkudb');
}

var newsRouter = require('./routes/news');
var adsRouter = require('./routes/ads');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api/news', newsRouter);
app.use('/api/ads', adsRouter);

module.exports = app;
