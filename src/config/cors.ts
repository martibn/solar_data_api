import * as cors from "cors";

const WHITELIST = ["localhost"];

export default cors({
    origin: (origin = "", next) => {
        next(null, WHITELIST.indexOf(origin) !== -1)
    }
});
