import { Request, Response, NextFunction } from 'express';
import { entitlementService } from '../services';

export class EntitlementController {
  async createEntitlement(req: Request, res: Response, next: NextFunction) {
    try {
      const entitlement = await entitlementService.createEntitlement(req.body);
      res.status(201).json({ success: true, data: entitlement });
    } catch (error) {
      next(error);
    }
  }

  async getEntitlements(req: Request, res: Response, next: NextFunction) {
    try {
      const entitlements = await entitlementService.getEntitlements();
      res.json({ success: true, data: entitlements });
    } catch (error) {
      next(error);
    }
  }

  async getEntitlementById(req: Request, res: Response, next: NextFunction) {
    try {
      const entitlement = await entitlementService.getEntitlementById(req.params.id);
      res.json({ success: true, data: entitlement });
    } catch (error) {
      next(error);
    }
  }

  async updateEntitlement(req: Request, res: Response, next: NextFunction) {
    try {
      const entitlement = await entitlementService.updateEntitlement(req.params.id, req.body);
      res.json({ success: true, data: entitlement });
    } catch (error) {
      next(error);
    }
  }

  async deleteEntitlement(req: Request, res: Response, next: NextFunction) {
    try {
      await entitlementService.deleteEntitlement(req.params.id);
      res.json({ success: true, message: 'Entitlement deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export const entitlementController = new EntitlementController();
