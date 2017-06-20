var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

//App
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

var puerto = 3000
// app.listen(puerto);
// console.log("Servidor corriendo en el puerto "+puerto);

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

app.get("/camaras/min", function(req,res){
  //console.log("Solicitud de camaras");

  db.camaras.find(function(err, docs){
    docs.forEach(function(c){
      delete c._id;
      delete c.descripcion;
    });
    res.json(docs);
  });
});

//POST
/*app.post("/camaras", */
agregarCamara = function(req, res) {
  //console.log(req.body);
  if(req.body.camara == null)
    res.status(400).send({message: "No se pueden agregar objetos nulos"})
  else db.camaras.insert(req.body.camara, function(err, doc){
    res.json(doc);
  });
};

//PUT
/*app.put("/camaras/:id", */
editarCamara = function(req, res) {
  var id = req.params.id;
  camara = req.body.camara;
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
}; 

//DELETE
/*app.delete("/camaras/:id",*/
eliminarCamara = function(req, res) {
  var id = req.params.id;
  console.log("eliminando "+id);
  db.camaras.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
    res.json(doc);
  });
};


// ---------------------------------------------------------
// ---------------------------------------------------------
// Admin
// ---------------------------------------------------------
// ---------------------------------------------------------


var config = require('./config'); // get our config file
app.set('clave', config.secret); // secret variable
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

// get an instance of the router for api routes
var apiRoutes = express.Router(); 

apiRoutes.post('/login', function(req, res) {
  //console.log(req.body);
  if(req.body.username == "admin" && req.body.password == "mean"){
    // create a token
    var token = jwt.sign(
      {
        'username': req.body.username,
        'admin': true
      }, 
      app.get('clave'), {
      expiresIn: 86400 // expires in 24 hours
    });

    res.json({
      success: true,
      message: 'Enjoy your token!',
      token: token
          });
  }
  else{
    res.json({ success: false, message: 'Falló la autenticación' });
  }
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token;
  // console.log(req.body);

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('clave'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.'
    });
  }
});

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------
apiRoutes.post('/camaras', agregarCamara);
apiRoutes.put('/camaras/:id', editarCamara);
// apiRoutes.delete('/camaras/:id', eliminarCamara);
apiRoutes.post('/camaras/eliminar/:id', eliminarCamara);

//api que necesita autenticación
app.use('/auth', apiRoutes);

app.listen(puerto);
console.log("Servidor corriendo en el puerto "+puerto);