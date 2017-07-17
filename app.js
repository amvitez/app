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
var servings;

mongodb.MongoClient.connect(uri, function(err, _db) { 
	db = _db;
	ingredients = db.collection('ingredients');
	servings = db.collection('servings');
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
    //var i = {
    //	name: req.body[0].name
    //};

    var data = req.body;

    for (var j = 0; j < data.length; j++) {
    	var a = data[j];
    	var s = a.serving;
    	var ingredientId;

    	// check ingredients for name
    	var exists = ingredients.find({name: a.ingredient});

    	if (exists) {
    		ingredientId = exists._id;
    		var newServing = {
			ingredientId: ingredientId,
			unit: s,
			nutrition: a.nutrition 
		};

		servings.insert(newServing);
    	} else {
    		var ingredient = {
	    		name: a.ingredient
	    	} 

	    	ingredients.insert(ingredient, function(err){
			   if (err) return;
			   // Object inserted successfully.
			   ingredientId = ingredient._id; // this will return the id of object inserted
			   var newServing = {
					ingredientId: ingredientId,
					unit: s,
					nutrition: a.nutrition 
				};

				servings.insert(newServing);
			});
    	}
    	
		
    }

    //if name exists, delete it and all servings for it
    //insert name into INGREDIENTS, get _id and for each serving insert _id, name, nutrition into SERVINGS

	ingredients.insert(i, function(err, res) {
		console.log(err);
	});
});

app.listen(process.env.PORT || 3000, function () {

});