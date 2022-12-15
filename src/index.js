const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions"); // provides us with Publish, subscripe and utility to alllow us to communicate around our application.
const typeDefs = require("./schema.graphql");
const db = require("./db");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const Post = require("./resolvers/Post");
const Comment = require("./resolvers/Comment");
const User = require("./resolvers/User");

const pubsub = new PubSub();

// Resolvers
const resolvers = {
  Query,
  Mutation,
  Post,
  Comment,
  User,
  Subscription,
};

// Create server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  context: {
    db,
    pubsub,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
