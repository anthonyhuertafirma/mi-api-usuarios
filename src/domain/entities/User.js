class User {
  constructor({ id, name, email, age, createdAt = new Date() }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.createdAt = createdAt;
    this.validate();
  }

  validate() {
    if (!this.id) throw new Error('User must have an ID');
    if (!this.name || this.name.trim().length === 0) throw new Error('Name is required');
    if (!this.email || this.email.trim().length === 0) throw new Error('Email is required');
    if (!this.age || this.age < 0) throw new Error('Valid age is required');
  }

  update(updateData) {
    const allowedFields = ['name', 'email', 'age'];
    const filteredUpdate = {};
    
    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        filteredUpdate[field] = updateData[field];
      }
    }

    return new User({
      ...this,
      ...filteredUpdate
    });
  }
}

module.exports = User;