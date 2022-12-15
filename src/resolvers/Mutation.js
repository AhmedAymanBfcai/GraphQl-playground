const { v4: uuidv4 } = require("uuid");

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some((user) => {
      return user.email === args.data.email;
    });

    if (emailTaken) {
      throw new Error("Email is already taken.");
    }

    const user = {
      id: uuidv4(),
      ...args.data,
    };

    db.users.push(user);
    return user;
  },

  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex((user) => {
      return (db.users.id = args.id);
    });

    if (userIndex === -1) {
      throw new Error("User not found.");
    }

    // Remove user
    const deletedUsers = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter((post) => {
      const match = post.author === args.id;

      if (match) {
        db.comments = db.comments.filter((comment) => {
          return comment.post !== post.id;
        });
      }
      return !match;
    });
    db.comments = db.comments.filter((comment) => {
      comment.author !== args.id;
    });

    return deletedUsers[0];
  },

  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.users.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    if (typeof data.email === "string") {
      const emailTaken = db.users.some((user) => user.email === data.email);
      if (emailTaken) {
        throw new Error("Emalil taken");
      }
      user.email = data.email;
    }

    if (typeof data.name === "string") {
      user.email = data.email;
    }

    if (typeof data.age !== "undefined") {
      user.age = data.age;
    }

    return user;
  },

  createPost(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some((user) => {
      return user.id === args.data.author;
    });

    if (!userExists) {
      throw new Error("User is not exist");
    }

    const post = {
      id: uuidv4(),
      ...args.data,
    };

    db.posts.push(post);

    if (args.data.published) {
      pubsub.publish("post", { post });
    }

    return post;
  },

  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex((post) => {
      return (db.posts.id = args.id);
    });

    if (postIndex === -1) {
      throw new Error("Post not found.");
    }

    // Remove post
    const deletedPosts = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter((comment) => {
      comment.post !== args.id;
    });

    return deletedPosts[0];
  },
  updatePost(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.posts.find((post) => post.id === id);

    if (!post) {
      throw new Error("Post not found");
    }

    if (typeof data.title === "string") {
      post.title = data.title;
    }

    if (typeof data.body === "string") {
      user.body = data.body;
    }

    if (typeof data.published === "Boolean") {
      user.published = data.published;
    }

    return post;
  },
  createComment(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some((user) => {
      return user.id === args.data.author;
    });

    const postExists = db.posts.some((post) => {
      return post.id === args.data.post && post.published;
    });

    if (!userExists || !postExists) {
      throw new Error("Unable to find user and post");
    }

    const comment = {
      id: uuidv4(),
      ...args.data,
    };

    db.comments.push(comment);
    pubsub.publish(`comment ${args.data.post}`, { comment });

    return comment;
  },

  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex((comment) => {
      return (comment.id = args.id);
    });

    if (commentIndex === -1) {
      throw new Error("Comment not found.");
    }

    // Remove Comment
    const deletedComments = db.comments.splice(commentIndex, 1);

    return deletedComments[0];
  },
  updateComment(parent, args, { db }, info) {
    const { id, data } = args;
    const comment = db.comments.find((comment) => comment.id === id);

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (typeof data.text === "string") {
      post.text = data.text;
    }
    return comment;
  },
};

module.exports = Mutation;
// export { Mutation as default };
