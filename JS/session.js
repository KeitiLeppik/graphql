// In index.html, checks if there is a token and if the token is not expired,
// then it will redirect to intraPage.html
export function sessionTokenCheck() {
	const JWTtoken = sessionStorage.getItem("JWT");

	if (JWTtoken) {
		const expirationTime = new Date(JSON.parse(JWTtoken).expires);
		const timeNow = Date.now();

		if (timeNow < expirationTime) {
			window.location.href = "intraPage.html";
		} else {
			endSession();
		}
	}
}

// End the session. For expired sessions.
export function endSession() {
	sessionStorage.removeItem("JWT");
}

// Creates the session.
export function createSession(JWT) {
	sessionStorage.setItem("JWT", JSON.stringify({ value: JWT, expires: sessionExpirationTime(60) }));
}

// Create a session expiration date.
function sessionExpirationTime(minutes) {
	const timeNow = new Date();
	const timeout = timeNow.getTime() + minutes * 60000;
	return new Date(timeout).toUTCString();
}


// Checks if there is a "JWT" session with an "expires" field. If true, compares
// it to current time. If current time is bigger than expires time, removes the
// session and navigates back to index.html.
export const sessionExpirationCheck = (page) =>{
	const JWToken = sessionStorage.getItem("JWT");
	if (JWToken === null) {
		return;
	}


	const expirationTime = new Date(JSON.parse(JWToken).expires);
	if (expirationTime) {
		const timeNow = Date.now();
		if (timeNow > expirationTime) {
			endSession();
			window.location.href = "index.html";
		}
	}
}


