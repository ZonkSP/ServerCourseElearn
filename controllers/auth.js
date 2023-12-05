const { response, request } = require('express');
const User = require('../models/usuarios');

const loginUser = (req = request, res = response) => {

    res.status(200).json({
        mgs: "ok"
    });
}


module.exports = {
    loginUser
}