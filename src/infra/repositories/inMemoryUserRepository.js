const UserRepositoryPort = require('../../application/ports/UserRepositoryPort');

class InMemoryUserRepository extends UserRepositoryPort {
  constructor() {
    super();
    this.users = new Map(); // Usamos Map para mejor performance
    this.nextId = 1;
  }

  async save(user) {
    const userWithId = { ...user, id: this.nextId.toString() };
    this.users.set(userWithId.id, userWithId);
    this.nextId++;
    return userWithId;
  }

  async findById(id) {
    return this.users.get(id) || null;
  }

  async findAll({ page = 1, limit = 10 }) {
    const usersArray = Array.from(this.users.values());
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      users: usersArray.slice(startIndex, endIndex),
      pagination: {
        page,
        limit,
        total: usersArray.length,
        totalPages: Math.ceil(usersArray.length / limit)
      }
    };
  }

  async update(id, userData) {
    const existingUser = this.users.get(id);
    if (!existingUser) return null;

    const updatedUser = { ...existingUser, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async delete(id) {
    return this.users.delete(id);
  }

  async findByEmail(email) {
    const usersArray = Array.from(this.users.values());
    return usersArray.find(user => user.email === email.toLowerCase()) || null;
  }

  async getCount() {
    return this.users.size;
  }
}

module.exports = InMemoryUserRepository;