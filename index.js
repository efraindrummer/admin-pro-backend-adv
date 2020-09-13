require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//crear el servidor de express
const app = express();

//Configurar Cors
app.use(cors());

//Base de batos
dbConnection();

//password V7FszKeBqA5Eu3Bu
//efraindrummer

//rutas 
app.get('/', (req, res) => {

    res.status(400).json({
        ok: true,
        msj: 'Hola Mundo'
    })

});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})