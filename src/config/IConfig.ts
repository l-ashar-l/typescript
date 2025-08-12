export default interface IConfig {
    apiPrefix: string;
    port: number;
    mongoUrl: string;
    env: string;
    redis?: {
        host: string;
        port: number;
        password: string;
    }
};
