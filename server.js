var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var session = require('express-session');

//App
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(session);

var puerto = 3000
app.listen(puerto);
console.log("Servidor corriendo en el puerto "+puerto);

//Base de datos
var db = mongojs('camaras', ['camaras']);

//API de comentario
app.get("/camaras", function(req,res){
	//console.log("Solicitud de camaras");

  db.camaras.find(function(err, docs){
    //console.log(docs)
    res.json(docs);
  });
});

app.post("/camaras", function(req, res) {
  //console.log(req.body);
  db.camaras.insert(req.body, function(err, doc){
    res.json(doc);
  });
});

app.delete("/camaras/:id", function(req, res) {
  var id = req.params.id;
  console.log("eliminando "+id);
  db.camaras.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  });
});

//Admin
function checkAuth(req, res, next) {
  console.log(req.session);
  //Si no hay sesion 
  if (!req.session) {
    res.send('Acceso denegado');
  } else { //if !req.session.user_id
    next();
  }
}
//Pagina secreta
app.get("/secreto", checkAuth, function (req,res) {
   res.send('Hello');
});

//Login
app.post('/login', function (req, res) {
  var post = req.body;
  console.log(req.session);
  if (post.user === 'admin' && post.password === 'admin') {
    req.session.user_id = "admin"; //XXX NO ES INSEGURO?
    res.sendStatus(200);
  } else {
    res.send('FUERA!');
    // res.sendStatus(403); //Forbidden 
  }
});
//Logout
app.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/');
});