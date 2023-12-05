const { response, request } = require('express');
const User = require('../models/usuarios');
const { generateJWT } = require('../helpers/jwt');

const getUsers = (req = request, res = response) => {
    
    const { searchTerm } = req.query;

    User.find({ name: RegExp(searchTerm) }).then(
        (result) => {
            res.status(200).json({
                usersList: result
            });
        }
    ).catch(
        (error) => {
            res.status(500).json({
                msg: "Error al obtener los datos"
            });
        }
    )
}

const getInforUser = (req = request, res = response) => {
    
    const searchUser = req.userActive.email;

    User.findOne({ email: searchUser }).then(
        (result) => {
            res.status(200).json({
                userInfo: result
            });
        }
    ).catch(
        (error) => {
            res.status(500).json({
                msg: "Error al obtener los datos"
            });
        }
    )
}

const loginUser = (req = request, res = response) => {

    const { email, password} = req.body;

    if ( !email || !password) {
        res.status(400).json({
            msg: "Error: Datos invalidos"
        });
        return;
    }

    User.findOne({ email: email, password: password}).then((result) => {
        if (result) {
            generateJWT(email).then((token) => {
                res.status(200).json({
                    token: token
                });
            }).catch((error) => {
                res.status(500).json({
                    msg: error
                });
            });
        } else {
            res.status(401).json({
                msg: "Error: Datos incorrectos"
            });
        }
    }).catch(() => {
        res.status(500).json({
            msg: "Error: Internal Error"
        });
    });
}

const registerUser = (req = request, res = response) => {

    const { name, email, password, role } = req.body;

    if ( !name || !email || !password || !role ) {
        res.status(400).json({
            msg: "Datos invalidos"
        });
        return;
    }

    const newUsuario = User({
        name,
        email,
        password,
        role,
        profile : {
            photo : "https://media.forgecdn.net/avatars/298/570/637349653941610981.png",
            bio: "A new user"
        }
    });

    newUsuario.save().then((result) => {
        res.status(200).json({
            msg: "Usuario registrado"
        });
        return;
    }).catch((error) => {
        res.status(500).json({
            msg: "Error al insertar usuario"
        });
        return;
    });
}


module.exports = {
    loginUser,
    registerUser,
    getUsers,
    getInforUser
}