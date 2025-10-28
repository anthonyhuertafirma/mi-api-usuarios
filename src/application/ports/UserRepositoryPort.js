class UserRepositoryPort {
  async save(user) {
    throw new Error('Method not implemented: save');
  }

  async findById(id) {
    throw new Error('Method not implemented: findById');
  }

  async findAll({ page, limit }) {
    throw new Error('Method not implemented: findAll');
  }

  async update(id, userData) {
    throw new Error('Method not implemented: update');
  }

  async delete(id) {
    throw new Error('Method not implemented: delete');
  }

  async findByEmail(email) {
    throw new Error('Method not implemented: findByEmail');
  }

  async getCount() {
    throw new Error('Method not implemented: getCount');
  }
}

module.exports = UserRepositoryPort;