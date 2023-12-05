const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

class Server {

    constructor()
    {
        this.app = express();
        this.port = process.env.PORT;
        this.connection_string = process.env.CONNECTION_STRING;

        this.cursosPath= "/api/cursos";
        this.usersPath = "/api/users";
        this.enrollPath = "/api/enroll";

        this.middlewares();
        this.routes();
        this.db();
    }

    routes() {
        this.app.use(this.cursosPath, require("../routes/cursos"));
        this.app.use(this.enrollPath, require('../routes/enroll'));
        this.app.use(this.usersPath, require("../routes/moduleUser"));

        this.app.get("*", (req, res) => {
            res.status(404).send("Error, ruta no encontrada.");
        });
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    db(){
        mongoose.connect(this.connection_string).then(
            () => {
                console.log("Conexion exitosa");
            }
        ).catch(
            (error) => {
                console.log("Error al conectar con la db");
                console.log(error);
            }
        );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;