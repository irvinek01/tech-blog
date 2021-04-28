const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");

const userData = require("./dataUsers.json");
const postData = require("./dataPosts.json");
const commentData = require("./dataComments.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Post.bulkCreate(postData);
  await Comment.bulkCreate(commentData);
  process.exit(0);
};

seedDatabase();
