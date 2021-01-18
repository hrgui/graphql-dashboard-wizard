import { ApolloClient, InMemoryCache } from '@apollo/client';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SchemaLink } from '@apollo/client/link/schema';
const data = require('./data.json');


const typeDefs = `
  type PlayerLoginBuckets {
    timestamp: String
    count: Float
  }

  type Query {
    hello: String
    player_logins: [PlayerLoginBuckets]
  }
`;

const resolvers = {
  Query: {
    hello: () => "world",
    player_logins: () => data
  }
};


const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers
})



export const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new SchemaLink({ schema })
});

export default graphqlClient;