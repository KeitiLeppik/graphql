import { sessionExpirationCheck } from "./session.js";
import { logoutHandler } from "./listeners.js";


export async function userData() {

	// Check if the session has expired
	sessionExpirationCheck("intraPage");
	// Set up the logout button handler
	logoutHandler();

}

