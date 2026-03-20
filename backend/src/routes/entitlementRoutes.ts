import { Router } from 'express';
import { entitlementController } from '../controllers';

const router = Router();

router.post('/', entitlementController.createEntitlement.bind(entitlementController));
router.get('/', entitlementController.getEntitlements.bind(entitlementController));
router.get('/:id', entitlementController.getEntitlementById.bind(entitlementController));
router.put('/:id', entitlementController.updateEntitlement.bind(entitlementController));
router.delete('/:id', entitlementController.deleteEntitlement.bind(entitlementController));

export default router;
