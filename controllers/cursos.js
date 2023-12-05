const { response, request } = require('express');
const Cursos = require('../models/cursos');
const Sequence = require('../models/IDcursos');
const User = require('../models/usuarios');

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

const getCoursesofProfessor = (req = request, res = response) => {
    
    const idUser = req.userActive._id;

    Cursos.find({ teacher: idUser }).then(
        (result) => {
            res.status(200).json({
                cursosListFromProfessor: result
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

const addCurso = (req = request, res = response) => {
    // Obtener los datos del cuerpo de la solicitud
    const { title, description, materials, videos, tasks } = req.body;
    const teacher = req.userActive._id;

    if (!title || !description || !materials || !videos || !teacher || !tasks) {
        res.status(500).json({
            msg: "ERROR: datos incompletos"
        });
    }

    // Obtener el próximo valor del curso
    Sequence.findByIdAndUpdate(
        { _id: 'cursosId' }, // Identificador único para la secuencia de cursos
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    )
    .then(sequenceDoc => {
        // Crear un nuevo curso con el ID incremental y los datos del req.body
        const newCurso = Cursos({
            id: sequenceDoc.sequence_value,
            title,
            description,
            materials,
            videos,
            teacher,
            tasks
        });

        // Guardar el nuevo curso
        newCurso.save().then((result) => {
            res.status(200).json({
                msg: "Curso Registrado"
            });
            return;
        }).catch((error) => {
            res.status(500).json({
                msg: "Error al registrar curso"
            });
            return;
        });
    })
    .catch(error => {
        // Manejar errores
        res.status(500).json({
            msg: 'Error al insertar curso',
            error: error.message
        });
    });
};

const deleteCurso = (req = request, res = response) => {
    const teacherID = req.userActive._id;
    const idCurso = parseInt(req.params.id);

    Cursos.findOneAndDelete(
        { teacher: teacherID, id: idCurso }
    )
    .then(result => {
        if (result) {
            res.status(200).json({
                msg: 'Curso eliminado del profesor'
            });
        } else {
            res.status(404).json({
                msg: 'Curso no encontrado para este profesor'
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            msg: 'Error al eliminar el curso del profesor',
            error: error.message
        });
    });
}


module.exports = {
    getCourses,
    getCourseFromId,
    getCoursesofProfessor,
    addCurso,
    deleteCurso
}