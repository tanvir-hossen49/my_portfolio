const projectRouter = require("express").Router();
const { getProjects } = require("../controller/projectController");

projectRouter.get("/api/project", getProjects);

module.exports = projectRouter;
