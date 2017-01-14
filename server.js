var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

// Create the database
var PouchDB = require('pouchdb');
var db = new PouchDB('workshop');

//create app to build
var app = express();

// =========================
// App Configs
// =========================
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.disable('x-powered-by');
//Allowing CORS
app.use(function(req,res,next) {
	res.append('Access-Control-Allow-Origin', req.headers.origin || '*');
	res.append('Access-Control-Allow-Credentials', 'true');
	res.append('Access-Control-Allow-Methods', ['GET', 'OPTIONS', 'PUT', 'POST', 'DELETE']);
	res.append('Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.enable('trust proxy');


// =======================================================================
// RESTful Routes
// HTTP Verbs: GET, POST, PUT, DELETE
//
// Name     |   Path      |   HTTP Verb |   Purpose
// =======================================================================
// Index    |   /         |   GET       | List all the posts
// Create   |   /         |   POST      | Create a new post
// Show     |   /:id      |   GET       | Show a single post
// Update   |   /:id      |   PUT       | Update a particular post
// Delete   |   /:id      |   DELETE    | Delete a particular post
// =======================================================================

// app.get('/hello',function(request,response){
// 	//console.log()
//   response.send('Hello World!');
// });

app.get('/posts/',function(req,res){
	db.allDocs({
		include_docs: true,
		attachments: true
	}, function(err,result){
		if (err){
			res.sendStatus(400);
		}else{
			res.status(200).json(result);
		}
	});
});

app.post('/posts/', function(req,res){
	var post = {
		title: req.body.title,
		post: req.body.post
	};

	db.post(post, function(err, created){
			if(err){
				res.sendStatus(400);
			}else{
				res.status(201).json(created);
			}
	});
	//console.log(req.body.title);
	//console.log(req.body.post);
	//res.sendStatus(200);
});

// app.delete('/posts/:id', function(req,res){
// 	db.get(req.param.id, function(err,found){
// 		if (err){
// 			res.sendStatus(400)
// 		}else{
// 			db.remove(found,function(err,found)){
// 				if(err){
// 					res.sendStatus(400);
// 				}else{
// 					res.status(202).json(removed);
// 				}
// 			}
// 		}
// 	});
//
// });
app.get('/app',function(req,res){
	res.sendfile(__dirname+ '/public/index.html');
});

app.listen(3000,function(){
  console.log('Server running!');
});
