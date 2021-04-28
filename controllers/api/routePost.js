const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const userPost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
        },
      ],
    });
    const serial = userPost.get({ plain: true });
    serial.comments.forEach(async (comment) => {
      const user = await User.findByPk(comment.user_id);
      comment.user_name = user.name;
    });
    console.log(serial);
    res.render("dashboard", { serial, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
