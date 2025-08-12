import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";

import { IConfig } from "./config";
import { notFoundRoute, router } from './routes';
import { loggerMiddleware } from "./middlewares";

class Server {
    private app: Application;
    private configurations: IConfig;

    constructor(config: IConfig) {
        this.configurations = config;
        this.app = express();
    }

    public bootstrap(): Application {
        this.initCors();
        this.initHelmet();
        this.logger();
        this.initBodyParsing();
        this.setupRoutes();
        return this.app;
    }

    public run(): void {
        const { port, env } = this.configurations;
        this.app.listen(port, () => {
            const message: string = `App is running successfully on ${port} in ${env} mode`;
            console.log(message);
            return this;
        });
    }

    public getApplication(): Application {
        return this.app;
    }

    private initCors(): Application {
        this.app.use(cors());
        return this.app;
    }

    private initHelmet(): Application {
        this.app.use(helmet());
        return this.app;
    }

    private initBodyParsing(): Application {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        return this.app;
    }

    private setupRoutes(): Application {
        const { apiPrefix } = this.configurations;
        this.app.use(apiPrefix, router);
        this.app.use(notFoundRoute);
        return this.app;
    }

    private logger(): Application {
        this.app.use(loggerMiddleware);
        return this.app;
    }
}

export default Server;
