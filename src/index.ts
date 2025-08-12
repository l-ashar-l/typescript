import Server from "./Server";
import { configurations } from "./config";

const server = new Server(configurations);
server.bootstrap();
server.run();