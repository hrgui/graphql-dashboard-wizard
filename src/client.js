import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SchemaLink } from '@apollo/client/link/schema';
const data = require('./data.json');


const typeDefs = `
  type PlayerLoginBuckets {
    timestamp: String
    count: Float
  }

  type PlayerLoginsAgg {
    sum: Float
    max: Float
    min: Float
  }

  type Query {
    player_logins(min_date: String, max_date: String, overlay: Boolean): [PlayerLoginBuckets]
    player_logins_agg: PlayerLoginsAgg
  }
`;

const resolvers = {
  Query: {
    player_logins: (root, args) => {
      let overallData = data;


      if (args.min_date) {
        const minDate = new Date(args.min_date);
        overallData = overallData.filter(({timestamp}) => {
          return new Date(timestamp) >= minDate;
        })
      }

      if (args.max_date) {
        const maxDate = new Date(args.max_date);
        overallData = overallData.filter(({timestamp}) => {
          return new Date(timestamp) <= maxDate;
        });
      }

      if (args.overlay) {
        // TODO: this is naive - it assumes same interval
        overallData = overallData.map(({timestamp, ...other}) => {
          const origTimestamp = new Date(timestamp);

          const overlayTimestamp = new Date("2021-01-01");
          overlayTimestamp.setDate(origTimestamp.getDate())

          return {...other, timestamp: overlayTimestamp.toString()};
        });
      }


      return overallData;
    },
    player_logins_agg: (root, args) => {
      return {};
    }
  },
  PlayerLoginsAgg: {
    sum: () => {
      return data.reduce((pV, {count}) => pV + count, 0)
    },
    max: () => {
      let max = Number.MIN_SAFE_INTEGER;

      for (let i = 0 ; i < data.length; i++) {
        if (data[i].count > max) {
          max = data[i].count;
        }
      }

      return max;
    },
    min: () => {
      let min = Number.MAX_SAFE_INTEGER;

      for (let i = 0 ; i < data.length; i++) {
        if (data[i].count < min) {
          min = data[i].count;
        }
      }

      return min;
    }
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

window.gql = gql;
window.graphqlClient = graphqlClient;

export default graphqlClient;