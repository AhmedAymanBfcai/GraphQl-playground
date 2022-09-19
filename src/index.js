import { ApolloServer, gql } from "apollo-server";

// Scalar types - String, Bolean, Int, Float, ID.
// Type definations (schema)
const typeDefs = gql`
  type Query {
    id: ID! #The "!" means that you have to return an idValue and you cannot return "null" :)
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`;

// Resolvers
const resolvers = {
  Query: {
    id: () => {
      return 1;
    },
    name: () => {
      return "Ahmed Ayman";
    },
    age: () => {
      return 22;
    },
    employed: () => {
      return true;
    },
    gpa: () => {
      return 3.8;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
