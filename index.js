require('dotenv').config();

const { Router } = require('express');
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//crear el servidor de express
const app = express();

//Configurar Cors
app.use(cors());

//lectura y parseo del bosy
app.use(express.json());

//Base de batos
dbConnection();

//Directorio publico
app.use(express.static('public'))

//password V7FszKeBqA5Eu3Bu
//efraindrummer
//rutas

//rutas de usuarios
app.use('/api/usuarios', require('./routes/usuarios'));
//ruta de hospitales
app.use('/api/hospitales', require('./routes/hospitales'));
//ruta de medicos
app.use('/api/medicos', require('./routes/medicos'));
//busquedas
app.use('/api/todo', require('./routes/busquedas'));
//ruta del auth
app.use('/api/login', require('./routes/auth'));
//ruta de uploads
app.use('/api/upload', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})