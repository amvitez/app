var express = require('express');
var bp = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
//var db = mongojs(connectionString, ['ingredients']);

var app = express();

/*
var logger = function(req, res, next) {
	console.log('log');
	next();
}

app.use(logger);*/

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

app.use(bp.json());
app.use(bp.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(3000, function () {

});