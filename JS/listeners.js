import { logout as performLogout } from "./logout.js";
import { login } from "./login.js";

export function loginHandler() {
    const loginButton = document.getElementById("login-submit");
    if (loginButton) {
        loginButton.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent form submission
            login();
        });
    }
    window.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            login();
        }
    });
}

export function logoutHandler() {
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => performLogout());
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loginHandler();
    logoutHandler();
});
