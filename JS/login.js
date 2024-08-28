import {createSession} from "./session.js";

// Login function to fetch the sign in JWT.
export async function login() {

	const usernameOrEmail = document.getElementById("username-email").value;
	const password = document.getElementById("password").value;

	// Get query and credentials for the GraphQL request.
	// Encrypt credentials.
	const { query, credentials } = getQueryAndCredentials(usernameOrEmail, password);
	const encryptedUserCredentials = encryptUserData(usernameOrEmail + ":" + password);

	// Fetch the data.
	try {
		const response = await fetch("https://01.kood.tech/api/auth/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Basic " + encryptedUserCredentials,
			},
			body: JSON.stringify({ query, credentials }),
		});


		if (!response.ok) {
			alert("OH NO! Wrong username/email or password! Please try again!");
		}

		// Successful fetching
		if (response.ok) {
			const responseData = await response.json();
			createSession(responseData);
			// alert("Logged in successfully!");
			window.location.href = "intraPage.html";
		}

	} catch (error) {
		console.log("Failed to fetch from kood/jõhvi");
	}
}

function getQueryAndCredentials(usernameOrEmail, password){
	// Query when user inputs email and password.
	if (isEmailValid(usernameOrEmail)) {
		let credentials = {
			username: usernameOrEmail,
			password: password,
		};
		let query =    
        `
            mutation signin($username: String!, $password: String!) {
                signin(username: $username, password: $password) {
                    token
                }
            }
        `;
		return { query, credentials };
	}

	// Query when user inputs username and password.
	let credentials = {
		email: usernameOrEmail,
		password: password,
	};
	let query =  `
    mutation signin($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
            token
        }
    }
`;

	return { query, credentials };
}


// Encrypt data for transfer to GraphQL endpoint.
//btoa is a built-in JavaScript function that encodes a string into Base64 format.
// It stands for "binary to ASCII".
function encryptUserData(data) {
	return btoa(data);
}

// Checks whether input is an email type.
function isEmailValid(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}



