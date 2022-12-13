const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema.graphql");
const db = require("./db");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Post = require("./resolvers/Post");
const Comment = require("./resolvers/Comment");
const User = require("./resolvers/User");

// Resolvers
const resolvers = {
  Query,
  Mutation,
  Post,
  Comment,
  User,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  context: {
    db,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
