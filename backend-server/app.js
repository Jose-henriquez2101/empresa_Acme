var express =  require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var app =  express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

//conexion
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_angular'
})

mc.connect();

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});

app.get('/', function (req, res, next) {
  res.status(200).json ({
    ok: true,
    message: 'Peticion realizada correctamente',
  });
});

app.get('/productos', function (req, res) {
    mc.query('SELECT * FROM productos', function (error, results, fields) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Lista de productos.'
        });
    });
});

app.post('/productos', function (req, res) {
  let datosProducto = {
  //productId: 0, /* campo autoincremental */
  productName: req.body.name,
  productCode: req.body.code,
  releaseDate: req.body.date,
  price: parseInt(req.body.price),
  description: req.body.description,
  starRating: parseInt(req.body.starRating),
  imageUrl: req.body.image
  };
  if (mc) {
    mc.query("INSERT INTO productos SET?", datosProducto, function (error, result) {
    if (error) {
    res.status(500).json({ "Mensaje": "Error" });
    }
    else {
    res.status(201).json({ "Mensaje": "Insertado" });
    }
    });
  }
});

app.put('/upload/productos/:id', (req, res) => {
  let id = req.params.id;

  if (!req.files) {
    return res.status(400).json({
      ok: false,
      mensaje: 'No se ha seleccionado archivo',
      errors: { message: 'No se ha seleccionado una imagen' }
    });
  }

  // Obtener nombre del archivo
  let archivo = req.files.imagen;
  let nombreCortado = archivo.name.split('.');
  let extensionArchivo = nombreCortado[nombreCortado.length - 1];

  // Solo estas extensiones aceptamos
  let extensionesValidas = ['jpg', 'png', 'gif', 'jpeg'];

  if (extensionesValidas.indexOf(extensionArchivo) < 0) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Extensión no válida',
      errors: {
        message: 'Las extensiones válidas son: ' + extensionesValidas.join(', ')
      }
    });
  }

  //Nombre del archivo personalizado
  let nombreArchivo = `${id}.${new Date().getMilliseconds()}.${extensionArchivo}`;

  //Mover el archivo temporal a un path
  let path = `uploads/productos/${nombreArchivo}`;

  console.log(path);

  archivo.mv(path, err => {
    if (err){
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al mover archivo',
        errors: err
      });
    }

    return res.status(200).json({
      ok:true,
      mensaje: 'Archivo subido correctamente',
    });
  });
  //falta insertar en la base de datos el nombre de la imagen
});

app.put('/productos/:id', (req, res) => {
    let id = req.params.id;
    let producto = req.body;
    console.log(id);
    console.log(producto);
    if (!id || !producto) {
        return res.status(400).send({ error: producto, message: 'Debe proveer un id y los datos de un producto' });
    }
    mc.query("UPDATE productos SET ? WHERE productId = ?", [producto, id], function (error, results, fields) {
        if (error) throw error;
        return res.status(200).json({ "Mensaje": "Registro con id=" + id + " ha sido actualizado"});
    });
});

app.delete('/productos/:id', function (req, res){
  let id = req.params.id;
  if(mc){
    console.log(id);
    mc.query("DELETE FROM productos WHERE productId = ?", id, function(error, result){
      if(error){
        return res.status(500).json({"Mensaje":"Error"});
      }
      else{
        return res.status(200).json({"Mensaje":"Registro con id="+ id + " borrado"});
      }
    });
  }
});

app.get('/existeproducto/:id', (req, res, next)=>{
  let id = req.params.id;
  console.log('id:'+id);
  mc.query("SELECT * FROM productos WHERE productCode = ?", id, function(error, result, fields){
    return res.send({
      error: false,
      data: result,
      message: 'Producto existe'
    });
  });
});

// CORS Middleware
app.use(function (req, res, next) {
  const rutasPublicas = ['/usuario', '/login', '/'];
  if (rutasPublicas.includes(req.path)) {
    return next();
  }

  let token = req.query.token;
  let SEED = 'esta-es-una-semilla';

  if (!token) {
    return res.status(401).json({
      ok: false,
      mensaje: 'Token no proporcionado',
      errors: { message: 'jwt must be provided' }
    });
  }

  jwt.verify(token, SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Token incorrecto',
        errors: err
      });
    }

    req.usuario = decoded.usuario;
    next();
  });
});



app.post('/usuario', function (req, res) {
    let datosUsuario = {
        userName: req.body.name,
        userEmail: req.body.email,
        userPassword: bcrypt.hashSync(req.body.password, 10),
        userImg: req.body.img,
        userRole: req.body.role
    };


    if (mc) {
        mc.query("INSERT INTO usuarios SET ?", datosUsuario, function (error, result) {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al crear usuario',
                    errors: error
                });
            } else {
                res.status(201).json({
                    ok: true,
                    usuario: result
                });
            }
        });
    } else {
        res.status(500).json({
            ok: false,
            mensaje: 'Error de conexión a la base de datos'
        });
    }
});


app.post('/login', (req, res) => {
  var body = req.body;

  mc.query("SELECT * FROM usuarios WHERE userEmail = ?", body.email, function (error, results, fields) {
    if (error) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar usuario',
        errors: error
      });
    }

    if (!results.length) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Credenciales incorrectas - email',
        errors: error
      });
    }

    console.log(results);
    console.log(results[0].userPassword);
    console.log(body.password);

    if (bcrypt.compareSync(body.password, results[0].userPassword)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Credenciales incorrectas - password',
        errors: error
      });
    }
    let SEED = 'este-es-una-semilla';
    let token = jwt.sign({ usuario: results[0] }, SEED, { expiresIn: 14400 });

    res.status(200).json({
      ok: true,
      usuario: results,
      id: results[0].userId,
      token: token
    });
  });
});