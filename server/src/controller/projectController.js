const createError = require("http-errors");
const projectModel = require("../models/projectModel");

const getProjects = async (_req, res, next) => {
  try {
    const project = await projectModel.find();

    if (typeof project !== "undefined" && project.length === 0) {
      throw createError(404, "project not found");
    }

    return res.status(200).send(project);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
};
