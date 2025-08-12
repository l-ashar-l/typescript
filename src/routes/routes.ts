import { Request, Response, Router } from "express";

import { urlRouter } from "../controllers";

const router: Router = Router();

router.use('/health-check', (_: Request, res: Response) => {
    return res.send({ status: 200, message: "I am OK" });
});

router.use('/url', urlRouter);

export default router;
