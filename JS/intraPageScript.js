import { userData } from "./intraPage.js";
import { sessionExpirationCheck } from "./session.js";
import { logoutHandler } from "./listeners.js";
import { fetchUserData } from "./getInfo/userInfo.js";
import { fetchLevelData } from "./getInfo/levelInfo.js";
import { displayName } from "./tablesAndGraphs/userDashboard.js";
import { displayAudit } from "./tablesAndGraphs/userDashboard.js";
import { displayModuleLevel } from "./tablesAndGraphs/userDashboard.js";
import { displayModuleXP } from "./tablesAndGraphs/userDashboard.js";
import { getModuleLevel } from "./tablesAndGraphs/userDashboard.js";
import { calculateModuleXP } from "./tablesAndGraphs/userDashboard.js";
import { audits } from "./tablesAndGraphs/audits.js";
import { placeProgress } from "./tablesAndGraphs/progressChart.js";
import { fetchGraphInfo } from "./getInfo/graphInfo.js";
// import { displayUserInfo } from "./getInfo/userInfo.js";
// import { fetchUser } from "./getInfo/userInfo.js";


userData();
intraPage();


// Base func for the profile page.
export async function intraPage() {
	sessionExpirationCheck("intraPage");
	logoutHandler();


	// Fetch the necessary data from the GraphQL API.
	const userInfo = await fetchUserData();
	// const userData = await fetchUser();
	const levelInfo = await fetchLevelData();
	const graphInfo = await fetchGraphInfo();

	// Necessary variables for displaying data.
	const { div01XP, piscineGO, piscineJS } = await calculateModuleXP(userInfo.xps);

	// Display the data received.
	// displayUserInfo(userData);


	displayName(`${userInfo.firstName} ${userInfo.lastName}`);
	displayAudit(userInfo.auditRatio, userInfo.totalUp, userInfo.totalDown);
	displayModuleLevel(getModuleLevel(levelInfo));
	displayModuleXP(div01XP, piscineGO, piscineJS);

	audits(userInfo.auditRatio, userInfo.totalUp, userInfo.totalDown);
	placeProgress(graphInfo, div01XP);

}


