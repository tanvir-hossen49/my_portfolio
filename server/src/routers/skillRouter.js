const skillRouter = require("express").Router();
const { getSkills } = require("../controller/skillController");

skillRouter.get("/api/skill", getSkills);

module.exports = skillRouter;
