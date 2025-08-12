import { NextFunction, Request, Response } from "express";

export default class UrlController {
    constructor() {}

    public async get(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> {
        try {
            const { urlId } = req.query;
            console.log("|------URLController-----|------get-----|------start-----|");
            return res.status(200).send({ url: urlId, encoded: `${urlId} ${urlId}` });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(`|------URLController-----|------get-----|------error: ${error.message}`);
                return next({ error: error.message, status: 500 });
            }
            console.log("|------URLController-----|------get-----|------unknown error-----|");
            return res.status(500).json({ error: 'Unknown error occurred' });
        } finally {
            console.log("|------URLController-----|------get-----|------ends-----|");
        }
    };

    public async create(req: Request, res: Response, next: NextFunction) {
        try{
            console.log("|------URLController-----|------create-----|------start-----|");
            const { url } = req.body;
            return res.status(200).json({ url });
        } catch(error) {
            if (error instanceof Error) {
                console.log(`|------URLController-----|------create-----|------error: ${error.message}`);
                return next({ error: error.message, status: 500 });
            }
            console.log("|------URLController-----|------create-----|------unknown error-----|");
            return res.status(500).json({ error: 'Unknown error occurred' });
        } finally {
            console.log("|------URLController-----|------create-----|------ends-----|");
        }
    }
}
