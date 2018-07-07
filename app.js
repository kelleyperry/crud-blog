var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
var router = express.Router();
var cors = require('cors');

var posts = require('./routes/posts');

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(cors());

var staticPath = 'public';

app.use('/api/', posts);
app.use(express.static(staticPath));
app.use('/', express.static(staticPath));
app.use('/post/*', express.static(staticPath));
app.use('/posts', express.static(staticPath));
app.use('/new', express.static(staticPath));

mongoose.connect('mongodb://kelleyperry:Zrgnoia6@localhost:27017/blogDb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
	console.log('DB Connected');
});

module.exports = app;
