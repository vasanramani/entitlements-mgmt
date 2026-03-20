import { Router } from 'express';
import { roleController } from '../controllers';

const router = Router();

router.post('/', roleController.createRole.bind(roleController));
router.get('/', roleController.getRoles.bind(roleController));
router.get('/:id', roleController.getRoleById.bind(roleController));
router.put('/:id', roleController.updateRole.bind(roleController));
router.delete('/:id', roleController.deleteRole.bind(roleController));
router.post('/:id/entitlements', roleController.addEntitlementToRole.bind(roleController));
router.delete('/:id/entitlements/:entitlementId', roleController.removeEntitlementFromRole.bind(roleController));

export default router;
