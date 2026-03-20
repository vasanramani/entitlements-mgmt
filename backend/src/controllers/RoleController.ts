import { Request, Response, NextFunction } from 'express';
import { roleService } from '../services';

export class RoleController {
  async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await roleService.createRole(req.body);
      res.status(201).json({ success: true, data: role });
    } catch (error) {
      next(error);
    }
  }

  async getRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await roleService.getRoles();
      res.json({ success: true, data: roles });
    } catch (error) {
      next(error);
    }
  }

  async getRoleById(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await roleService.getRoleById(req.params.id);
      res.json({ success: true, data: role });
    } catch (error) {
      next(error);
    }
  }

  async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await roleService.updateRole(req.params.id, req.body);
      res.json({ success: true, data: role });
    } catch (error) {
      next(error);
    }
  }

  async deleteRole(req: Request, res: Response, next: NextFunction) {
    try {
      await roleService.deleteRole(req.params.id);
      res.json({ success: true, message: 'Role deleted' });
    } catch (error) {
      next(error);
    }
  }

  async addEntitlementToRole(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await roleService.addEntitlementToRole(req.params.id, req.body.entitlementId);
      res.json({ success: true, data: role });
    } catch (error) {
      next(error);
    }
  }

  async removeEntitlementFromRole(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await roleService.removeEntitlementFromRole(req.params.id, req.params.entitlementId);
      res.json({ success: true, data: role });
    } catch (error) {
      next(error);
    }
  }
}

export const roleController = new RoleController();
