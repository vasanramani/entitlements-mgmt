import { AppDataSource } from '../utils/database';
import { Role, Entitlement, RoleEntitlement } from '../entities';
import { ValidationError, NotFoundError, ConflictError } from '../utils/errors';

export class RoleService {
  private roleRepository = AppDataSource.getRepository(Role);
  private entitlementRepository = AppDataSource.getRepository(Entitlement);
  private roleEntitlementRepository = AppDataSource.getRepository(RoleEntitlement);

  async createRole(data: { name: string; description?: string }) {
    if (!data.name || data.name.trim().length === 0) {
      throw new ValidationError('Role name is required');
    }

    const existing = await this.roleRepository.findOne({ where: { name: data.name } });
    if (existing) {
      throw new ConflictError('Role already exists');
    }

    const role = this.roleRepository.create({
      name: data.name,
      description: data.description || null,
    });

    return this.roleRepository.save(role);
  }

  async getRoles() {
    return this.roleRepository.find({
      relations: ['roleEntitlements', 'roleEntitlements.entitlement'],
    });
  }

  async getRoleById(id: string) {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['roleEntitlements', 'roleEntitlements.entitlement', 'userRoles', 'userRoles.user'],
    });
    if (!role) {
      throw new NotFoundError('Role not found');
    }
    return role;
  }

  async updateRole(id: string, data: { name?: string; description?: string }) {
    const role = await this.getRoleById(id);

    if (data.name) {
      const existing = await this.roleRepository.findOne({ where: { name: data.name } });
      if (existing && existing.id !== id) {
        throw new ConflictError('Role name already exists');
      }
      role.name = data.name;
    }

    if (data.description !== undefined) {
      role.description = data.description;
    }

    return this.roleRepository.save(role);
  }

  async deleteRole(id: string) {
    const role = await this.getRoleById(id);
    return this.roleRepository.remove(role);
  }

  async addEntitlementToRole(roleId: string, entitlementId: string) {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['roleEntitlements'],
    });
    if (!role) {
      throw new NotFoundError('Role not found');
    }

    const entitlement = await this.entitlementRepository.findOne({ where: { id: entitlementId } });
    if (!entitlement) {
      throw new NotFoundError('Entitlement not found');
    }

    const existing = await this.roleEntitlementRepository.findOne({
      where: { role_id: roleId, entitlement_id: entitlementId },
    });
    if (existing) {
      throw new ConflictError('Role already has this entitlement');
    }

    await this.roleEntitlementRepository.save({
      role_id: roleId,
      entitlement_id: entitlementId,
    });

    return this.getRoleById(roleId);
  }

  async removeEntitlementFromRole(roleId: string, entitlementId: string) {
    const result = await this.roleEntitlementRepository.delete({
      role_id: roleId,
      entitlement_id: entitlementId,
    });

    if (result.affected === 0) {
      throw new NotFoundError('Role entitlement assignment not found');
    }

    return this.getRoleById(roleId);
  }
}

export const roleService = new RoleService();
