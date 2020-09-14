const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid: uid
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se puedo generar el JSON WEB TOKEN');
            } else {
                resolve(token);
            }
        });

    });

}

module.exports = {
    generarJWT,
}