const express = require('express');
const path = require('path');

class App {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    
    // Logging middleware básico
    this.app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });
  }

  setupRoutes() {
    // Importar rutas de usuarios
    const userRoutes = require('./routes/users');
    this.app.use('/usuarios', userRoutes);
    
    // Ruta de salud global
    this.app.get('/health', (req, res) => {
      res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Users API - Clean Architecture',
        version: '1.0.0'
      });
    });

    // Ruta raíz
    this.app.get('/', (req, res) => {
      res.json({
        message: 'Bienvenido a la API de Usuarios con Arquitectura Limpia',
        documentation: {
          health: '/health',
          users: '/usuarios'
        }
      });
    });

    // Manejo de rutas no encontradas
    this.app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        error: 'Route not found',
        path: req.originalUrl
      });
    });

    // Manejo de errores global
    this.app.use((error, req, res, next) => {
      console.error('Error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    });
  }

  start(port = 3000) {
    return new Promise((resolve, reject) => {
      const server = this.app.listen(port, () => {
        console.log(`🚀 Servidor corriendo en puerto ${port}`);
        console.log(`📍 Health check: http://localhost:${port}/health`);
        console.log(`👥 Users API: http://localhost:${port}/usuarios`);
        console.log(`📚 API Docs: http://localhost:${port}/`);
        resolve(server);
      });

      server.on('error', (error) => {
        console.error('❌ Error starting server:', error);
        reject(error);
      });
    });
  }

  getApp() {
    return this.app;
  }
}

module.exports = App;