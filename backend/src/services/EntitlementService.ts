import { AppDataSource } from '../utils/database';
import { Entitlement } from '../entities';
import { ValidationError, NotFoundError, ConflictError } from '../utils/errors';

export class EntitlementService {
  private entitlementRepository = AppDataSource.getRepository(Entitlement);

  async createEntitlement(data: { name: string; description?: string }) {
    if (!data.name || data.name.trim().length === 0) {
      throw new ValidationError('Entitlement name is required');
    }

    const existing = await this.entitlementRepository.findOne({ where: { name: data.name } });
    if (existing) {
      throw new ConflictError('Entitlement already exists');
    }

    const entitlement = this.entitlementRepository.create({
      name: data.name,
      description: data.description || null,
    });

    return this.entitlementRepository.save(entitlement);
  }

  async getEntitlements() {
    return this.entitlementRepository.find();
  }

  async getEntitlementById(id: string) {
    const entitlement = await this.entitlementRepository.findOne({
      where: { id },
      relations: ['roleEntitlements', 'roleEntitlements.role'],
    });
    if (!entitlement) {
      throw new NotFoundError('Entitlement not found');
    }
    return entitlement;
  }

  async updateEntitlement(id: string, data: { name?: string; description?: string }) {
    const entitlement = await this.getEntitlementById(id);

    if (data.name) {
      const existing = await this.entitlementRepository.findOne({ where: { name: data.name } });
      if (existing && existing.id !== id) {
        throw new ConflictError('Entitlement name already exists');
      }
      entitlement.name = data.name;
    }

    if (data.description !== undefined) {
      entitlement.description = data.description;
    }

    return this.entitlementRepository.save(entitlement);
  }

  async deleteEntitlement(id: string) {
    const entitlement = await this.getEntitlementById(id);
    return this.entitlementRepository.remove(entitlement);
  }
}

export const entitlementService = new EntitlementService();
