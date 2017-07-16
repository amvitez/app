var express = require('express');
var bp = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
var mongodb = require('mongodb');
//var db = mongojs(connectionString, ['ingredients']);

var app = express();

/*
var logger = function(req, res, next) {
	console.log('log');
	next();
}

app.use(logger);*/
console.log(66666);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

app.use(bp.json());
app.use(bp.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

var seedData = [
  {
    decade: '1970s',
    artist: 'Debby Boone',
    song: 'You Light Up My Life',
    weeksAtOne: 10
  },
  {
    decade: '1980s',
    artist: 'Olivia Newton-John',
    song: 'Physical',
    weeksAtOne: 10
  },
  {
    decade: '1990s',
    artist: 'Mariah Carey',
    song: 'One Sweet Day',
    weeksAtOne: 16
  }
];

var uri = 'mongodb://heroku_93hrxj6h:fnq24dnqc0lpqvo9l9m7f8rf4v@ds161162.mlab.com:61162/heroku_93hrxj6h';

mongodb.MongoClient.connect(uri, function(err, db) { 
	console.log(99);
	console.log(err);
	var songs = db.collection('songs');
	songs.insert(seedData, function(err, result) {
    
    if(err) throw err;
});
});

app.get('/', function (req, res, next) {
	res.render('index', {
		title: "Smart Meals"
	});
});

app.get('/ingredients', function (req, res, next) {
	//db.ingredients.find(function(err, docs) {
		res.render('ingredients', {
			ingredients: []
		});
	//});
});

app.listen(process.env.PORT || 3000, function () {

});