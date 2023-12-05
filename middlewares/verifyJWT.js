const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarios');

const validateJWT = (req =request, res = response, next) => {

    const token = req.header("Authorization");
    if (!token) {
        res.status(401).json({
            msg: "Token invalido"
        });
        return;
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        User.findOne({ email: id }).then((result) => {
            if (result) {
                //console.log(result);
                req.userActive = result;
                next();
            }else{
                res.status(401).json({
                    msg: "Token invalido"
                });
                return;
            }
        }).catch((error) => {
            res.status(500).json({
                msg: "Error en el servidor"
            });
            return;
        });
    } catch (error) {
        res.status(401).json({
            msg: "Token invalido"
        });
        return;
    }
}

module.exports = {
    validateJWT
}