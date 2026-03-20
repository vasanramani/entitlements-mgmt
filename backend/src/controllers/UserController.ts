import { Request, Response, NextFunction } from 'express';
import { userService } from '../services';

export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getUsers();
      res.json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.deleteUser(req.params.id);
      res.json({ success: true, message: 'User deleted' });
    } catch (error) {
      next(error);
    }
  }

  async addRoleToUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.addRoleToUser(req.params.id, req.body.roleId);
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  async removeRoleFromUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.removeRoleFromUser(req.params.id, req.params.roleId);
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
