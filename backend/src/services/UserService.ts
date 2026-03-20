import { AppDataSource } from '../utils/database';
import { User, Role, UserRole } from '../entities';
import { hashPassword, validateEmail, validateUsername } from '../utils/validators';
import { NotFoundError, ValidationError, ConflictError } from '../utils/errors';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private roleRepository = AppDataSource.getRepository(Role);
  private userRoleRepository = AppDataSource.getRepository(UserRole);

  async createUser(data: { username: string; email: string; password: string }) {
    if (!validateUsername(data.username)) {
      throw new ValidationError('Invalid username format');
    }
    if (!validateEmail(data.email)) {
      throw new ValidationError('Invalid email format');
    }
    if (!data.password || data.password.length < 6) {
      throw new ValidationError('Password must be at least 6 characters');
    }

    const existingUser = await this.userRepository.findOne({
      where: [{ username: data.username }, { email: data.email }],
    });
    if (existingUser) {
      throw new ConflictError('User already exists');
    }

    const passwordHash = await hashPassword(data.password);
    const user = this.userRepository.create({
      username: data.username,
      email: data.email,
      password_hash: passwordHash,
    });

    return this.userRepository.save(user);
  }

  async getUsers() {
    return this.userRepository.find({
      relations: ['userRoles', 'userRoles.role', 'userRoles.role.roleEntitlements', 'userRoles.role.roleEntitlements.entitlement'],
    });
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['userRoles', 'userRoles.role', 'userRoles.role.roleEntitlements', 'userRoles.role.roleEntitlements.entitlement'],
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async updateUser(id: string, data: { username?: string; email?: string }) {
    const user = await this.getUserById(id);

    if (data.username && !validateUsername(data.username)) {
      throw new ValidationError('Invalid username format');
    }
    if (data.email && !validateEmail(data.email)) {
      throw new ValidationError('Invalid email format');
    }

    if (data.username) user.username = data.username;
    if (data.email) user.email = data.email;

    return this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id);
    return this.userRepository.remove(user);
  }

  async addRoleToUser(userId: string, roleId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userRoles'],
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      throw new NotFoundError('Role not found');
    }

    const userRoleExists = await this.userRoleRepository.findOne({
      where: { user_id: userId, role_id: roleId },
    });
    if (userRoleExists) {
      throw new ConflictError('User already has this role');
    }

    await this.userRoleRepository.save({
      user_id: userId,
      role_id: roleId,
    });

    return this.getUserById(userId);
  }

  async removeRoleFromUser(userId: string, roleId: string) {
    const result = await this.userRoleRepository.delete({
      user_id: userId,
      role_id: roleId,
    });

    if (result.affected === 0) {
      throw new NotFoundError('User role assignment not found');
    }

    return this.getUserById(userId);
  }
}

export const userService = new UserService();
