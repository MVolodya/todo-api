import {
	gql,
	makeExecutableSchema
} from "apollo-server";
import { GraphQLSchema } from "graphql";

const userSchema: GraphQLSchema = makeExecutableSchema({
	typeDefs: gql`
		type Query {
			allUsers: [User]
		}
		type Mutation {
			addUser(name: String!, surname: String!, password: String!): User
			deleteUser(id: String!): User
			updateUser(id: String!, name: String, surname: String): User
			login(name: String!, password: String!): AuthPayload
		}
		type User {
			_id: String
			name: String
			surname: String
		}
		type AuthPayload {
			token: String
			user: User
		}		
	`
});

export default userSchema;