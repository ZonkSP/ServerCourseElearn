const { response, request } = require('express');
const Cursos = require('../models/cursos');

const cursosList = [];

const getCourses = (req = request, res = response) => {
    
    const { searchTerm } = req.query;

    Cursos.find({ title: RegExp(searchTerm) }).then(
        (result) => {
            res.status(200).json({
                cursosList: result
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

const getCourseFromId = (req = request, res = response) => {

    const selectCurso = parseInt(req.params.id);

    Cursos.find({ id: selectCurso}).then(
        (result) => {
            res.status(200).json({
                cursosList: result
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


module.exports = {
    getCourses,
    getCourseFromId
}