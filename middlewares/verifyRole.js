const { response, request } = require('express');

const verifyRole = (req = request, res = response, next) => {

    if (!req.userActive) {
        res.status(404).json({
            msg: "Permiso denegado"
        });
        return;
    }

    if (req.userActive.role != "professor") {
        res.status(401).json({
            msg: "roleUserError: Permiso denegado"
        });
        return;
    }

    next();
}

module.exports = {
    verifyRole
}