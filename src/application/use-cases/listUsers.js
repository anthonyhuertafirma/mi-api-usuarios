class ListUsers {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ page = 1, limit = 10 }) {
    if (page < 1) throw new Error('Page must be greater than 0');
    if (limit < 1 || limit > 100) throw new Error('Limit must be between 1 and 100');

    const result = await this.userRepository.findAll({ page, limit });
    return result;
  }
}

module.exports = ListUsers;