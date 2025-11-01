const UserRepositoryPort = require('../../application/ports/UserRepositoryPort');
const { v4: uuidv4 } = require('uuid');

class InMemoryUserRepository extends UserRepositoryPort {
  constructor() {
    super();
    this.users = new Map();
  }

  async save(user) {
    const userWithId = { 
      ...user, 
      id: user.id || uuidv4(),
      createdAt: user.createdAt || new Date(),
      updatedAt: new Date()
    };
    this.users.set(userWithId.id, userWithId);
    return userWithId;
  }

  async findById(id) {
    return this.users.get(id) || null;
  }

  async findAll({ page = 1, limit = 10 }) {
    const usersArray = Array.from(this.users.values());
    
    // Ordenar por fecha de creación (más recientes primero)
    usersArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = usersArray.slice(startIndex, endIndex);
    
    return {
      users: paginatedUsers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: usersArray.length,
        totalPages: Math.ceil(usersArray.length / limit),
        hasNext: endIndex < usersArray.length,
        hasPrev: page > 1
      }
    };
  }

  async update(id, userData) {
    const existingUser = this.users.get(id);
    if (!existingUser) return null;

    const updatedUser = { 
      ...existingUser, 
      ...userData, 
      updatedAt: new Date() 
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async delete(id) {
    return this.users.delete(id);
  }

  async findByEmail(email) {
    const usersArray = Array.from(this.users.values());
    return usersArray.find(user => 
      user.email.toLowerCase() === email.toLowerCase()
    ) || null;
  }

  async getCount() {
    return this.users.size;
  }
}

module.exports = InMemoryUserRepository;