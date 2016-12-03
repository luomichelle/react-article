// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//Require Schemas
var Article = require('./server/model.js');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// -------------------------------------------------

// MongoDB Configuration configuration
mongoose.connect('mongodb://admin:reactrocks@ds023593.mlab.com:23593/heroku_pg676kmk');
var db = mongoose.connection;

db.on('error', function (err) {
	console.log('Mongoose Error: ', err);
});

db.once('open', function () {
	console.log('Mongoose connection successful.');
});



// -------------------------------------------------

// Main Route
app.get('/', function(req, res){
	res.sendFile('./public/index.html');
})

// Route to get all saved articles
app.get('/api/saved', function(req, res) {

	Article.find({})
		.exec(function(err, doc){

			if(err){
				console.log(err);
			}
			else {
				res.send(doc);
			}
		})
});

// Route to add an article to saved list
app.post('/api/saved', function(req, res){
	var newArticle = new Article(req.body);

	console.log(req.body)

	var title = req.body.title;
	var date = req.body.date;
	var url = req.body.url;

	newArticle.save(function(err, doc){
		if(err){
			console.log(err);
		} else {
			res.send(doc._id);
		}
	});
});

// Route to delete an article from saved list
app.delete('/api/saved/', function(req, res){

	var url = req.param('url');

	Article.find({"url": url}).remove().exec(function(err, data){
		if(err){
			console.log(err);
		}
		else {
			res.send("Deleted");
		}
	});
});


// -------------------------------------------------

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});
