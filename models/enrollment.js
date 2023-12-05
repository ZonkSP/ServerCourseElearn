const mongoose = require('mongoose');
const Usuarios = require('./usuarios');
const Cursos = require("./cursos");

const enrollmentSchema = mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: Usuarios },
    course: { type: mongoose.Schema.Types.ObjectId, ref: Cursos },
    enrolledAt: { type: Date, default: Date.now },
    // Otros campos relacionados con la inscripción
})

module.exports = mongoose.model("enrollment", enrollmentSchema);