import { ApolloServer, gql } from "apollo-server";

// Scalar types - String, Bolean, Int, Float, ID.
// Type definations (schema)
const typeDefs = gql`
  type Query {
    me: User!
  }

  type User {
    id: ID! #The "!" means that you have to return an idValue and you cannot return "null" :)
    name: String!
    email: String!
    age: Int
  }
`;

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: "1",
        name: "Ahmed BFCAI",
        email: "ahmed@example.com",
        age: null,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
