const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Leer el token del header
    const token = req.header('x-auth-token');

    // Revisar si no hay token
    if(!token) {
        return res.status(401).json({msg: 'No hay Token, permiso no válido'})
    }

    // validar el token
let secreta="secreta";
    try {
        const cifrado = jwt.verify(token,secreta );
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token no válido'});
    }
}