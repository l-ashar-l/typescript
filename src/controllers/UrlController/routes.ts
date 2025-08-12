import { Router } from "express";

import { UrlController } from ".";

const router: Router = Router();
const controller: UrlController = new UrlController();

router.get('/', controller.get);

router.post('/', controller.create);

export default router;