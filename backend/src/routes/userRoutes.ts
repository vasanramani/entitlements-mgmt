import { Router } from 'express';
import { userController } from '../controllers';

const router = Router();

router.post('/', userController.createUser.bind(userController));
router.get('/', userController.getUsers.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));
router.put('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));
router.post('/:id/roles', userController.addRoleToUser.bind(userController));
router.delete('/:id/roles/:roleId', userController.removeRoleFromUser.bind(userController));

export default router;
