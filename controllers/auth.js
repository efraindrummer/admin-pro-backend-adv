const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            //sino existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            //existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        //guardar en la base de datos
        await usuario.save();

        //generar el token = JWT
        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log()

        res.status(401).json({
            ok: false,
            msj: 'El Token no es correcto'
        });

    }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    //generar el token = JWT
    const token = await generarJWT(uid);


    res.json({
        ok: true,
        token
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}