class GetUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const user = await this.userRepository.findById(userId);
    return user;
  }
}

module.exports = GetUser;