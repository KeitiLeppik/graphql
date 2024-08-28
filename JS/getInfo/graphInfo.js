export const fetchGraphInfo = async () => {


const xpQuery = `
  query transaction($order_by: [transaction_order_by!], $where: transaction_bool_exp) {
    transaction(order_by: $order_by, where: $where) {
      type
      amount
      objectId
      userId
      createdAt
      path
      object {
        attrs
      }
    }
  }
`;
const xpVariables = {
	order_by: { createdAt: "asc" },
	where: {
		type: {
			_eq: "xp",
		},
		object: {
			attrs: {
				_has_key: "displayedName",
			},
		},
		path: {
			_nregex: "/.+piscine.+/",
		},
	},
};

    const JWTtoken = JSON.parse(sessionStorage.getItem("JWT"))["value"];
  
    try {
      const info = await fetch("https://01.kood.tech/api/graphql-engine/v1/graphql", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + JWTtoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: xpQuery,
          variables: xpVariables,
        }),
      });
  
      const jsonData = await info.json();

      const graphInfo = jsonData.data.transaction
      console.log("GRAPHINFO:", graphInfo);
      return graphInfo;
    } catch (error) {
      console.log(error);
    }
  }