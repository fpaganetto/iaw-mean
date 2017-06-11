var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

//App
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

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