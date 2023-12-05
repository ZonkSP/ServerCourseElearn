const { response, request } = require('express');
const Enroll = require('../models/enrollment');
const Curso = require('../models/cursos');
const { default: mongoose } = require('mongoose');

const getEnroll = (req = request, res = response) => {
    const studentID = req.userActive._id;

    Enroll.find({ student: studentID })
        .populate({
            path: 'course',
            populate: {
                path: 'teacher',
                select: 'name'
            }
        })
        .populate('student', 'name profile')
        .then(
            (result) => {
                res.status(200).json({
                    enroll: result,
                    msg: "ok"
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

const signInCurso = (req = request, res = response) => {
    const studentID = req.userActive._id;
    const idCurso = parseInt(req.params.id);
    let idObjectCurso;

    Curso.findOne({ id: idCurso })
    .then((result) => {
        idObjectCurso = result._id;
        Enroll.findOne({
            student: studentID,
            course: idObjectCurso
        }).then((enrollment) => {
            if (enrollment) {
                // Ya existe una inscripción con el estudiante y curso especificados
                res.status(500).json({
                    msg: "ERROR: Usuario ya registrado en este curso"
                });
            } else {
                // No existe inscripción, se puede crear una nueva
                const newUserInCurso = Enroll({
                    student: studentID,
                    course: idObjectCurso,
                    enrolledAt: Date.now()
                });

                newUserInCurso.save()
                    .then(() => {
                        res.status(200).json({
                            msg: "Usuario inscrito exitosamente en el curso"
                        });
                    })
                    .catch((error) => {
                        res.status(500).json({
                            msg: "Error al registrar curso"
                        });
                    });
            }
        })
        .catch((error) => {
            res.status(500).json({
                msg: "Error al buscar inscripción"
            });
        });
    })
    .catch((error) => {
        res.status(500).json({
            msg: "Error al encontrar el curso"
        });
    })
}

const signOutCurso = (req = request, res = response) => {
    const studentID = req.userActive._id;
    const idCurso = parseInt(req.params.id);

    Curso.findOne({ id: idCurso })
    .then((result) => {
        if (!result) {
            res.status(404).json({
                msg: "Curso no encontrado"
            });
        } else {
            const idObjectCurso = result._id;

            Enroll.findOneAndDelete({
                student: studentID,
                course: idObjectCurso
            })
            .then((enrollment) => {
                if (!enrollment) {
                    res.status(404).json({
                        msg: "Usuario no inscrito en este curso"
                    });
                } else {
                    res.status(200).json({
                        msg: "Usuario eliminado exitosamente del curso"
                    });
                }
            })
            .catch((error) => {
                res.status(500).json({
                    msg: "Error al eliminar inscripción"
                });
            });
        }
    })
    .catch((error) => {
        res.status(500).json({
            msg: "Error al encontrar el curso"
        });
    });
}


module.exports = {
    getEnroll,
    signInCurso,
    signOutCurso
}