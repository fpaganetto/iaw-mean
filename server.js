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

/*
nombre
descripcion
latitud
longitud
*/

var db = mongojs('camaras', ['camaras']);

//API de camaras
app.get("/camaras", function(req,res){
	//console.log("Solicitud de camaras");

  db.camaras.find(function(err, docs){
    //console.log(docs)
    res.json(docs);
  });
});

//POST
app.post("/camaras", function(req, res) {
  //console.log(req.body);
  db.camaras.insert(req.body, function(err, doc){
    res.json(doc);
  });
});

//PUT
app.put("/camaras/:id", function(req, res) {
  var id = req.params.id;
  camara = req.body;
  delete camara._id;
  
  db.camaras.findAndModify(
    {query: {_id: mongojs.ObjectId(id)}, //Seleccina el contacto a editar
      update: {$set : camara
      /*{
        nombre: req.body.nombre, 
        descripcion: req.body.descripcion, 
        latitud: req.body.latitud, 
        longitud: req.body.longitud
        }*/
      },
      new: true}, //Fin de la query
    function(err, doc){
      res.json(doc);
    }
  );//Fin de findAndModify
}); 

//DELETE
app.delete("/camaras/:id", function(req, res) {
  var id = req.params.id;
  console.log("eliminando "+id);
  db.camaras.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  });
});