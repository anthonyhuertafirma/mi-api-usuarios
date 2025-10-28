const { validateEmail, validateAge, validateName } = require('../../domain/validators/userValidators');
const User = require('../../domain/entities/User');

class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData) {
    // Validaciones de entrada
    if (!validateName(userData.name)) {
      throw new Error('Name must be between 2 and 50 characters');
    }

    if (!validateEmail(userData.email)) {
      throw new Error('Invalid email format');
    }

    if (!validateAge(userData.age)) {
      throw new Error('User must be at least 13 years old');
    }

    // Verificar unicidad de email
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Crear entidad de usuario
    const user = new User({
      id: Date.now().toString(), // Temporal - luego usaremos UUID
      name: userData.name.trim(),
      email: userData.email.toLowerCase().trim(),
      age: userData.age
    });

    // Guardar usuario
    return await this.userRepository.save(user);
  }
}

module.exports = CreateUser;