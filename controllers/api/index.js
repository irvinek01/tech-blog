const router = require("express").Router();
const userRoutes = require("./routeUser");
const postRoutes = require("./routePost");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);

module.exports = router;
