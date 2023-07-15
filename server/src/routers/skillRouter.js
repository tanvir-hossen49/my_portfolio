const skillRouter = require("express").Router();
const { getSkills } = require("../controller/skillController");

skillRouter.get("/", getSkills);

module.exports = skillRouter;
