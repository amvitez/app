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

var uri = 'mongodb://heroku_93hrxj6h:fnq24dnqc0lpqvo9l9m7f8rf4v@ds161162.mlab.com:61162/heroku_93hrxj6h';
var db;
var ingredients;

mongodb.MongoClient.connect(uri, function(err, _db) { 
	db = _db;
	ingredients = db.collection('ingredients');
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

app.post('/import-ingredients', function (req, res, next) {
    var i = {
    	name: req.body.name
    };

	ingredients.insert(i, function(err, res) {
		console.log(err);
	});
});

app.listen(process.env.PORT || 3000, function () {

});