//Modules Array, Defines the module names.
const modules = ["DIV-01", "PISCINE GO", "PISCINE JS"];

// Display the name of the user.
export async function displayName(name) {
	const h3 = document.getElementById("username");
	h3.textContent = "Welcome " + name;
}


//Displays audit numbers.
export async function displayAudit(ratio, given, received) {
	const auditRatio = document.getElementById("ratio");
	const auditGiven = document.getElementById("given");
	const auditReceived = document.getElementById("received");
	auditRatio.textContent = ratio.toFixed(2);
	auditGiven.textContent = given;
	auditReceived.textContent = received;
	const auditGivenPr = document.getElementById("givenpr");
	const auditReceivedPr = document.getElementById("receivedpr");
	auditGivenPr.textContent = (given*100/(received+given)).toFixed(1).toString() + "%";
	auditReceivedPr.textContent = (received*100/(received+given)).toFixed(1).toString() + "%";
}


//Displays the level and module for each module.
export async function displayModuleLevel(levelObject) {
	const displays = [...document.querySelectorAll(".xpDisplay")];

	for (let i = 0; i < displays.length; i++) {
		const xpDiv = document.createElement("div");
		const levelDiv = document.createElement("div");
		const moduleDiv = document.createElement("div");
		xpDiv.classList.add("xp-div", "flex");
		levelDiv.classList.add("level-div", "flex");
		moduleDiv.classList.add("module-div", "flex");

		const moduleLevel = document.createElement("span");
		moduleLevel.textContent = levelObject[i];
		moduleLevel.classList.add("module-level");

		const moduleName = document.createElement("span");
		moduleName.textContent = modules[i];
		moduleName.classList.add("module-name");

		const xpText = document.createElement("span");
		xpText.classList.add("module-xp");

		xpDiv.appendChild(moduleName);
		levelDiv.appendChild(moduleLevel);
		moduleDiv.appendChild(xpText);
		displays[i].appendChild(xpDiv);
		displays[i].appendChild(levelDiv);
		displays[i].appendChild(moduleDiv);
	}
}

//Displays the XP numbers for each module.
export async function displayModuleXP(div01, go, js) {
	const xps = [...document.querySelectorAll(".module-xp")];
	const array = [div01, go, js];

	for (let i = 0; i < xps.length; i++) {
		xps[i].textContent = "XP:" + array[i];
	}
}
//Calculates the amount of XP for each module.
export async function calculateModuleXP(xps) {
	let div01XP = 0;
	let piscineGO = 0;
	let piscineJS = 0;

	for (let i = 0; i < xps.length; i++) {
		var module = xps[i].path;
		if (module.includes("piscine-go")) {
			piscineGO += xps[i].amount;
			continue;
		}
		if (module.includes("piscine-js")) {
			piscineJS += xps[i].amount;
			continue;
		}
		if (xps[i].path.includes("div-01")) div01XP += xps[i].amount;
	}

	// Return the xp values.
	return { div01XP, piscineGO, piscineJS };
}

// Get the level of each module.
export async function getModuleLevel(levels) {
	const levelObject = {
		div01: 0,
		piscineGO: 0,
		piscineJS: 0,
	};
	const moduleArray = ["div-01", "piscine-go", "piscine-js"];

	for (let i = 0; i < moduleArray.length; i++) {
		for (let j = 0; j < levels.length; j++) {
			if (levels[j].path.includes(moduleArray[i])) {
				levelObject[i] = levels[j].amount;
				break;
			}
		}
	}

	return levelObject;
}
