class UserDTO {
  static fromDomain(user) {
    if (!user) return null;
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      createdAt: user.createdAt
    };
  }

  static fromDomainList(users) {
    return users.map(user => UserDTO.fromDomain(user));
  }

  static toResponse(user) {
    const dto = UserDTO.fromDomain(user);
    if (!dto) return null;

    return {
      success: true,
      data: dto
    };
  }

  static toListResponse(users, pagination = null) {
    return {
      success: true,
      data: UserDTO.fromDomainList(users),
      ...(pagination && { pagination })
    };
  }
}

module.exports = UserDTO;