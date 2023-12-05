const mongoose = require('mongoose');
const Usuarios = require('./usuarios');

const cursosSchema = mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    materials: [String],
    videos: [String],
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: Usuarios }, // Referencia al ID del profesor
    tasks: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            title: String,
            description: String,
            dueDate: String,
            completedBy: {
                type: [{ type: mongoose.Schema.Types.ObjectId, ref: Usuarios }],
                default: [] // Valor predeterminado como un array vacío
            } // Referencia a los IDs de los estudiantes que completaron la tarea
        }
        // Otras tareas
    ]
    // Otros campos relacionados con el curso
})

module.exports = mongoose.model('Cursos', cursosSchema);
