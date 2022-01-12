import * as express from 'express';
import * as bodyParser from "body-parser";
import {readdirSync} from "fs";
import {join} from "path";

const API = express();

// Middleware
import cors from "./cors";

API.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
API.use(bodyParser.json({ limit: "50mb" }));
API.use(cors);

// Controller autodiscover
const controllersPath = join(__dirname, "..", "controllers");

readdirSync(controllersPath).forEach((file) => {
    const { basePath, router } = require(join(controllersPath, file));
    logger.debug(`Registering ${basePath} from ${file}`);

    API.use(basePath, router);
});

export default API;
