import { sessionTokenCheck, sessionExpirationCheck } from "./session.js";
import { loginHandler } from "./listeners.js";

sessionTokenCheck();
loginHandler();
sessionExpirationCheck();
