var express = require('express');
var exphbs  = require('express-handlebars');
var handlebars  = require('handlebars');
var fs = require('fs');

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));

var materials;
fs.readFile('./data/materials.json', {enconding: 'utf8'}, function(err, data){
	if (err) throw err;
	materials = JSON.parse(data);
});


app.get('/', function(req, res){
	materials.featuredArticle.safeContent = new handlebars.SafeString(materials.featuredArticle.content);
	materials.featuredRepo.safeContent = new handlebars.SafeString(materials.featuredRepo.content);

	res.render('index', {
		articles: materials.articles,
		tutorials: materials.tutorials,
		videos: materials.videos,
		featuredArticle: materials.featuredArticle,
		featuredRepo: materials.featuredRepo,
		videoSet: materials.videoSet
	});
});

var server = app.listen(process.env.PORT || 3000, function(){
	console.log('Server listening on port ' + server.address().port);
});
