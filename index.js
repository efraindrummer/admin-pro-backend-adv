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

//password V7FszKeBqA5Eu3Bu
//efraindrummer
//rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})