	export const fetchLevelData = async () => {


	const levelQuery = `
	query transaction($order_by: [transaction_order_by!], $where: transaction_bool_exp) {
		transaction(order_by: $order_by, where: $where) {
		type
		amount
		createdAt
		path
		}
	}
	`;
	const levelVariables = {
		order_by: {
			amount: "desc",
		},
		where: {
			type: {
				_eq: "level",
			},
		},
	};

		const JWTtoken = JSON.parse(sessionStorage.getItem("JWT"))["value"];

		try {
			const info = await fetch("https://01.kood.tech/api/graphql-engine/v1/graphql", {
				method: "POST",
				headers: {
					Authorization: "Bearer " + JWTtoken,
				},
				body: JSON.stringify({
					query: levelQuery,
					variables: levelVariables,
				}),
			});

			const jsonData = await info.json();
			const levelData = jsonData.data.transaction;

		console.log("levelData:", levelData);
			return levelData;
		} catch (error) {
			console.log(error);
		}
	}
