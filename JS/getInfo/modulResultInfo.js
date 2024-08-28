export const fetchProgressInfo = async () => {


const progressInfoQuery = `
  query progress {
    progress {
      createdAt
      grade
      path
    }
  }
`;

	const JWTtoken = JSON.parse(sessionStorage.getItem("JWT"))["value"];
	const query = progressInfoQuery;

	try {
		const info = await fetch("https://01.kood.tech/api/graphql-engine/v1/graphql", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + JWTtoken,
			},
			body: JSON.stringify({ query }),
		});

		const jsonData = await info.json();
		const progressData = jsonData.data.progress;

    console.log("MODULRESULTINFO:", progressData);
		return progressData;
	} catch (error) {
		console.log(error);
	}
}
