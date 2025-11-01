const express = require('express');
const router = express.Router();

// Importar casos de uso y repositorio
const InMemoryUserRepository = require('../../repositories/inMemoryUserRepository');
const CreateUser = require('../../../application/use-cases/createUser');
const GetUser = require('../../../application/use-cases/getUser');
const ListUsers = require('../../../application/use-cases/listUsers');
const UpdateUser = require('../../../application/use-cases/updateUser');
const DeleteUser = require('../../../application/use-cases/deleteUser');
const UserController = require('../../../adapters/controllers/userController');

// Inicializar dependencias
const userRepository = new InMemoryUserRepository();
const createUser = new CreateUser(userRepository);
const getUser = new GetUser(userRepository);
const listUsers = new ListUsers(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

const userController = new UserController(
  createUser,
  getUser,
  listUsers,
  updateUser,
  deleteUser
);

// Rutas funcionales
router.post('/', (req, res) => userController.create(req, res));
router.get('/', (req, res) => userController.list(req, res));
router.get('/:id', (req, res) => userController.getById(req, res));
router.put('/:id', (req, res) => userController.update(req, res));
router.delete('/:id', (req, res) => userController.delete(req, res));

// Ruta de información (opcional)
router.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'API de Usuarios - Arquitectura Limpia',
    endpoints: [
      'POST / - Crear usuario',
      'GET / - Listar usuarios (paginado)',
      'GET /:id - Obtener usuario por ID',
      'PUT /:id - Actualizar usuario',
      'DELETE /:id - Eliminar usuario'
    ]
  });
});

module.exports = router;