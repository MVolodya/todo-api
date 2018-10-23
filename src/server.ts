import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';
import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "graphql-tools";
import resolvers from "./resolvers/resolvers";
import schemas from "./schemas/shemas";
import { userController } from "./controllers/controllers";
import getToken from './helpers/getToken';
import jwt from 'jsonwebtoken';


require("dotenv").config()

const {
  USER_NAME,
  USER_PASS,
  DB_URL,
  DB_NAME
} = process.env

const JWT_SECRET = ' @._MyL1ttl3S3cr3t_.# '

mongoose.set("debug", true);

(async () => {
  try {
    await mongoose.connect(`mongodb://${USER_NAME}:${USER_PASS}@${DB_URL}/${DB_NAME}`);
    console.log('Connected to DB');
  } catch (error) {
    console.log(error, 'Error connect to mongoDB');
  }
})();

const schema: GraphQLSchema = mergeSchemas({
	schemas,
	resolvers
});

const server = new ApolloServer({
  cors: true,
  schema,
	context: async (req: any) => {
    try {
      const token = getToken(req.headers.authorization)
      const { payload }: any = jwt.verify(token, JWT_SECRET)

      if (!payload.tenant)
        throw new Error('No Tenant')

      // try to retrieve a user with the token
      const user = await userController.user(token);
      if (user.length > 0) {
        return { user };
      }
    } catch (err) {
      console.log(err)
      return {}
    }
	}
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});