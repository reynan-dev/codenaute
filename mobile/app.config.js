require('dotenv').config();

export default {
	extra: {
		GRAPHQL_API_URL: process.env.SERVER_URL || '/graphql'
	}
};
