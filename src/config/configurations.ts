import { config } from "dotenv";

import IConfig from "./IConfig"

config();
const env: NodeJS.ProcessEnv = process.env;

function requireEnvVar(name: string): string {
    const value = env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

const configurations: IConfig = Object.freeze({
    apiPrefix: requireEnvVar("API_PREFIX"),
    port: parseInt(requireEnvVar("PORT")),
    mongoUrl: requireEnvVar("MONGO_URL"),
    env: requireEnvVar("ENV"),
})

export default configurations;