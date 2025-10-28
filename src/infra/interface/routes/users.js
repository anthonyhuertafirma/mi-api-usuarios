const express = require('express');
const router = express.Router();

// Ruta temporal para probar que funciona
router.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'API de Usuarios funcionando correctamente! 🎉',
    timestamp: new Date().toISOString(),
    endpoints: [
      'POST /usuarios - Crear usuario',
      'GET /usuarios/:id - Obtener usuario',
      'GET /usuarios - Listar usuarios (con paginación)',
      'PUT /usuarios/:id - Actualizar usuario', 
      'DELETE /usuarios/:id - Eliminar usuario'
    ]
  });
});

// Ruta de salud específica para usuarios
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Users API',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Ruta placeholder para crear usuario (la implementaremos después)
router.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Endpoint para crear usuarios - Próximamente',
    data: null
  });
});

// Ruta placeholder para obtener usuario por ID
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Endpoint para obtener usuario ${req.params.id} - Próximamente`,
    data: null
  });
});

module.exports = router;