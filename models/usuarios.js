const mongoose = require('mongoose');

const usuariosSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['professor', 'student'] }, // Para definir el rol del usuario
    profile: {
        photo: String, // URL de la foto de perfil
        bio: String
      // Otra información relevante del perfil
    },
    // Otros campos relevantes según sea necesario
})

module.exports = mongoose.model("Usuarios", usuariosSchema);