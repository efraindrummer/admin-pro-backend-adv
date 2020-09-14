const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msj: 'Email no valida'
            });
        }

        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msj: 'Contraseña no valida'
            });
        }

        //generar el token = JWT
        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msj: 'Habla con el administrador'
        });
    }

}

module.exports = {
    login
}