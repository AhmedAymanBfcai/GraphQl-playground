import { ApolloServer, gql } from "apollo-server";

// Scalar types - String, Bolean, Int, Float, ID.
// Type definations (schema)
const typeDefs = gql`
  type Query {
    greeting(name: String, position: String): String! #The "!" means that you have to return an idValue and you cannot return "null" :)
    add(a: Float!, b: Float!): Float!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello, ${args.name}! You are my favoriate ${args.position}.`;
      } else {
        return "Hello!";
      }
    },
    add(parent, args, ctx, info) {
      return args.a + args.b;
    },
    me() {
      return {
        id: "123098",
        name: "Ahmed",
        email: "ahmed@example.com",
      };
    },
    post() {
      return {
        id: "092",
        title: "GraphQL 101",
        body: "",
        published: false,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
