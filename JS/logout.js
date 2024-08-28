import { endSession } from "./session.js";

export function logout() {
	endSession();
	window.location.href = "index.html";
}