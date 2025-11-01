const UserDTO = require('../presenters/userDTO');

class UserController {
  constructor(createUser, getUser, listUsers, updateUser, deleteUser) {
    this.createUser = createUser;
    this.getUser = getUser;
    this.listUsers = listUsers;
    this.updateUser = updateUser;
    this.deleteUser = deleteUser;
  }

  async create(req, res) {
    try {
      const user = await this.createUser.execute(req.body);
      res.status(201).json(UserDTO.toResponse(user));
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const user = await this.getUser.execute(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      res.json(UserDTO.toResponse(user));
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async list(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await this.listUsers.execute({ 
        page: parseInt(page), 
        limit: parseInt(limit) 
      });
      
      res.json(UserDTO.toListResponse(result.users, result.pagination));
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const user = await this.updateUser.execute(req.params.id, req.body);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      res.json(UserDTO.toResponse(user));
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await this.deleteUser.execute(req.params.id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = UserController;