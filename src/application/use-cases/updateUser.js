const { validateEmail, validateAge, validateName } = require('../../domain/validators/userValidators');

class UpdateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId, updateData) {
    if (!userId) throw new Error('User ID is required');

    // Verificar que el usuario existe
    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) return null;

    // Validar campos a actualizar
    if (updateData.name && !validateName(updateData.name)) {
      throw new Error('Name must be between 2 and 50 characters');
    }

    if (updateData.email) {
      if (!validateEmail(updateData.email)) {
        throw new Error('Invalid email format');
      }
      
      // Verificar que el email no esté en uso por otro usuario
      const userWithEmail = await this.userRepository.findByEmail(updateData.email);
      if (userWithEmail && userWithEmail.id !== userId) {
        throw new Error('Email already registered by another user');
      }
    }

    if (updateData.age && !validateAge(updateData.age)) {
      throw new Error('User must be at least 13 years old');
    }

    return await this.userRepository.update(userId, updateData);
  }
}

module.exports = UpdateUser;